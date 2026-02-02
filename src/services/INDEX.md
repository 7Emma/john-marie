# Services - Architecture

## Structure des Services

Les services sont organisés par responsabilité fonctionnelle:

### 1. uploadService.js
**Responsabilité:** Gestion des uploads de fichiers

**Méthodes:**
- `uploadImage(file, category, options)` - Upload une image avec catégorie et options
- `checkHealth()` - Vérifie la connexion au serveur

**Utilisé par:**
- UploadForm.jsx
- AdminGallery.jsx

---

### 2. photoService.js
**Responsabilité:** Opérations CRUD sur les photos

**Méthodes:**
- `getAllPhotos()` - Récupère toutes les photos par catégorie
- `getPhotosByCategory(category)` - Photos d'une catégorie spécifique
- `deletePhoto(photoId)` - Supprime une photo
- `updatePhoto(photoId, updates)` - Met à jour les métadonnées
- `searchPhotos(query)` - Recherche des photos

**Utilisé par:**
- AdminGallery.jsx
- GalleryPage.jsx

---

### 3. galleryService.js
**Responsabilité:** Statistiques et analytics de la galerie

**Méthodes:**
- `getStats()` - Stats générales (total photos, taille, date)
- `getDetailedStats()` - Stats détaillées (téléchargements, favoris, top 10)
- `incrementDownloads(photoId)` - Enregistre un téléchargement
- `incrementFavorites(photoId)` - Ajoute aux favoris
- `decrementFavorites(photoId)` - Retire des favoris

**Utilisé par:**
- AdminDashboard.jsx
- GalleryPage.jsx
- AdminGallery.jsx

---

## Migration depuis uploadService.js ancien

Si vous aviez du code utilisant l'ancien uploadService.js qui contenait toutes les méthodes:

### Ancien code:
```javascript
import UploadService from '../services/uploadService';

UploadService.getAllPhotos();
UploadService.getStats();
UploadService.incrementDownloads(id);
```

### Nouveau code:
```javascript
import UploadService from '../services/uploadService';
import PhotoService from '../services/photoService';
import GalleryService from '../services/galleryService';

PhotoService.getAllPhotos();      // À la place de UploadService.getAllPhotos()
GalleryService.getStats();         // À la place de UploadService.getStats()
GalleryService.incrementDownloads(id); // À la place de UploadService.incrementDownloads()
```

---

## Avantages de cette architecture

✅ **Séparation des responsabilités** - Chaque service a un rôle clair
✅ **Testabilité** - Plus facile de tester des services isolés
✅ **Maintenabilité** - Modifications plus sûres et localisées
✅ **Réutilisabilité** - Services découplés et réutilisables
✅ **Scalabilité** - Facile d'ajouter de nouveaux services

---

## Exemple d'ajout d'un nouveau service

```javascript
// frontend/src/services/userService.js
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export class UserService {
  static async getProfile() {
    const response = await fetch(`${API_BASE}/user/profile`);
    return response.json();
  }
}

export default UserService;
```

Puis dans un composant:
```javascript
import UserService from '../services/userService';

const profile = await UserService.getProfile();
```
