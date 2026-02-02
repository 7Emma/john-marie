# API Centralisée - Documentation

## Architecture

```
axiosInstance.js (HttpClient)
        ↓
    api.js (Couche API)
        ↓
Services (uploadService, photoService, galleryService)
        ↓
  Composants React
```

---

## axiosInstance.js - Client HTTP

Classe `HttpClient` pour gérer les requêtes HTTP avec:
- Gestion uniforme des requêtes
- Gestion des timeouts
- Gestion des erreurs
- Support FormData pour uploads

### Utilisation Directe

```javascript
import { HttpClient } from '../services/axiosInstance';

// GET
const data = await HttpClient.get('/photos');

// POST
const result = await HttpClient.post('/upload', { name: 'test' });

// PUT
const updated = await HttpClient.put('/photos/123', { description: 'New' });

// DELETE
await HttpClient.delete('/photos/123');

// FormData (uploads)
const formData = new FormData();
formData.append('file', file);
await HttpClient.post('/upload', formData);
```

### Gestion des Erreurs

```javascript
import { HttpClient, HttpError } from '../services/axiosInstance';

try {
  const data = await HttpClient.get('/photos');
} catch (error) {
  if (error instanceof HttpError) {
    if (error.isClientError) {
      console.log('Erreur client:', error.status);
    } else if (error.isServerError) {
      console.log('Erreur serveur:', error.status);
    } else if (error.isNetworkError) {
      console.log('Erreur réseau:', error.message);
    }
  }
}
```

---

## api.js - Couche API Centralisée

Regroupe tous les appels API organisés par domaine.

### 1. Photos API - `api.photos`

```javascript
import api from '../services/api';

// Récupérer toutes les photos
const response = await api.photos.getAll();
const photos = response.data;

// Récupérer photos par catégorie
const couplePhotos = await api.photos.getByCategory('couple');

// Récupérer une photo par ID
const photo = await api.photos.getById(photoId);

// Rechercher des photos
const results = await api.photos.search('mariage');

// Créer/Mettre à jour/Supprimer
await api.photos.create(data);
await api.photos.update(photoId, data);
await api.photos.delete(photoId);
```

### 2. Uploads API - `api.uploads`

```javascript
import api from '../services/api';

// Upload une image
const response = await api.uploads.uploadImage(
  file,
  'couple',
  {
    description: 'Ma photo',
    uploadedBy: 'user@example.com'
  }
);

// Upload plusieurs images
const response = await api.uploads.uploadMultiple(
  [file1, file2, file3],
  'couple'
);
```

### 3. Gallery API - `api.gallery`

```javascript
import api from '../services/api';

// Stats générales
const stats = await api.gallery.getStats();

// Stats détaillées
const detailedStats = await api.gallery.getDetailedStats();

// Stats par catégorie
const categoryStats = await api.gallery.getCategoryStats('couple');

// Suivi d'engagement
await api.gallery.trackDownload(photoId);
await api.gallery.trackFavorite(photoId);
await api.gallery.untrackFavorite(photoId);

// Top photos
const topDownloaded = await api.gallery.getTopDownloaded(10);
const topFavorited = await api.gallery.getTopFavorited(10);
```

### 4. Health API - `api.health`

```javascript
import api from '../services/api';

// Vérifie la connexion
await api.health.check();
```

---

## Services - Couche Métier

Les services utilisent la couche API et ajoutent de la logique métier.

### PhotoService

```javascript
import PhotoService from '../services/photoService';

// Récupère toutes les photos
const photos = await PhotoService.getAllPhotos();

// Récupère par catégorie
const categoryPhotos = await PhotoService.getPhotosByCategory('couple');

// Récupère par ID
const photo = await PhotoService.getPhotoById(photoId);

// CRUD
await PhotoService.deletePhoto(photoId);
await PhotoService.updatePhoto(photoId, { description: 'New' });
await PhotoService.searchPhotos('query');
```

### GalleryService

```javascript
import GalleryService from '../services/galleryService';

// Stats
const stats = await GalleryService.getStats();
const detailed = await GalleryService.getDetailedStats();
const categoryStats = await GalleryService.getCategoryStats('couple');

// Engagement
await GalleryService.incrementDownloads(photoId);
await GalleryService.incrementFavorites(photoId);
await GalleryService.decrementFavorites(photoId);

// Top photos
const topDownloaded = await GalleryService.getTopDownloaded(10);
const topFavorited = await GalleryService.getTopFavorited(10);
```

### UploadService

```javascript
import UploadService from '../services/uploadService';

// Upload une image
const result = await UploadService.uploadImage(
  file,
  'couple',
  { description: 'Ma photo' }
);

// Vérifier la santé du serveur
const isHealthy = await UploadService.checkHealth();
```

---

## Flux Complet: Exemple Upload

```javascript
// 1. Composant UploadForm
import UploadService from '../services/uploadService';

const handleUpload = async (file, category) => {
  try {
    // 2. UploadService appelle api.uploads
    const result = await UploadService.uploadImage(file, category);
    
    // 3. api.uploads appelle HttpClient.post()
    // 4. HttpClient effectue la requête fetch
    
    console.log('Upload réussi:', result);
  } catch (error) {
    console.error('Erreur upload:', error);
  }
};
```

```
Composant
   ↓
UploadService.uploadImage(file, category)
   ↓
uploadsApi.uploadImage(file, category, metadata)
   ↓
HttpClient.post('/upload', formData)
   ↓
fetch('http://localhost:5000/api/upload', ...)
```

---

## Gestion Avancée

### Intercepteur de Requête Personnalisé

Si vous avez besoin d'ajouter des headers à toutes les requêtes:

```javascript
// Dans axiosInstance.js, modifiez HttpClient.request():
static async request(endpoint, options = {}) {
  const config = {
    ...DEFAULT_OPTIONS,
    ...options,
    headers: {
      ...DEFAULT_OPTIONS.headers,
      ...options.headers,
      'Authorization': `Bearer ${localStorage.getItem('token')}` // Ajouter le token
    },
  };
  // ... reste du code
}
```

### Configuration d'Environnement

```javascript
// .env
VITE_API_URL=http://localhost:5000/api

// src/services/axiosInstance.js
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
```

### Gestion d'Erreurs Globales

```javascript
// Créer un helper pour les erreurs
export const handleApiError = (error) => {
  if (error instanceof HttpError) {
    if (error.status === 401) {
      // Rediriger vers login
    } else if (error.status === 500) {
      // Afficher message d'erreur serveur
    }
  } else {
    // Erreur inattendue
  }
};
```

---

## Bonnes Pratiques

### ✅ À faire

```javascript
// Utiliser les services dans les composants
import PhotoService from '../services/photoService';

const photos = await PhotoService.getAllPhotos();

// Gérer les erreurs
try {
  const data = await PhotoService.getPhotoById(id);
} catch (error) {
  console.error(error);
}
```

### ❌ À éviter

```javascript
// Ne pas utiliser HttpClient directement dans les composants
import { HttpClient } from '../services/axiosInstance';

const data = await HttpClient.get('/photos'); // ❌

// Ne pas faire des appels fetch directs
const response = await fetch('http://localhost:5000/api/photos'); // ❌
```

---

## Ajout d'une Nouvelle API

```javascript
// 1. Ajouter dans api.js
export const newApi = {
  getData() {
    return HttpClient.get('/new-endpoint');
  },
  
  postData(data) {
    return HttpClient.post('/new-endpoint', data);
  },
};

// 2. Ajouter au regroupement
export const api = {
  photos: photosApi,
  uploads: uploadsApi,
  gallery: galleryApi,
  health: healthApi,
  new: newApi, // ← Nouveau
};

// 3. Créer un service si nécessaire
export class NewService {
  static async getData() {
    const response = await newApi.getData();
    return response.data;
  }
}
```

---

## Tests

```javascript
// Exemple de test unitaire
import { HttpClient } from '../services/axiosInstance';

jest.mock('../services/axiosInstance');

test('should fetch photos', async () => {
  HttpClient.get.mockResolvedValue({ data: [] });
  
  const result = await PhotoService.getAllPhotos();
  
  expect(HttpClient.get).toHaveBeenCalledWith('/photos');
  expect(result).toEqual([]);
});
```
