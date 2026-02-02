# 📡 Système de Loader & Auto-Refresh

## Vue d'ensemble

Un système complet de chargement et de mise à jour automatique des données sans rechargement manuel.

### Composants

#### 1. **Loader Component** (`Loader.jsx`)
Affiche un spinner de chargement avec message.

```jsx
import { Loader, LoaderError } from "../components/Loader";

// Simple loader
<Loader message="Chargement..." />

// Avec tailles
<Loader message="Chargement..." size="small" />
<Loader message="Chargement..." size="medium" />
<Loader message="Chargement..." size="large" />

// Fullscreen
<Loader message="Chargement..." fullScreen={true} />

// Avec erreur et bouton retry
<LoaderError message="Erreur de connexion" onRetry={() => loadPhotos()} />
```

#### 2. **PhotoSkeleton** (`PhotoSkeleton.jsx`)
Affiche un skeleton loader (placeholder) pendant le chargement.

```jsx
import PhotoSkeleton from "../components/PhotoSkeleton";

<PhotoSkeleton count={6} /> // 6 placeholder par défaut
```

### Hook

#### **useAutoRefresh** (`useAutoRefresh.js`)
Hook qui gère le rafraîchissement automatique des données.

**Fonctionnalités:**
- ✅ Polling automatique à intervalle régulier
- ✅ Détecte quand l'utilisateur change d'onglet (visibilitychange)
- ✅ Rafraîchit immédiatement quand l'utilisateur revient
- ✅ Pause le polling quand l'onglet est inactif

**Utilisation:**

```jsx
import { useAutoRefresh } from "../hooks/useAutoRefresh";
import { useCallback, useState } from "react";

const MyComponent = () => {
  const [data, setData] = useState([]);

  // Créer une fonction de chargement stable
  const loadData = useCallback(async () => {
    try {
      const response = await api.getData();
      setData(response);
    } catch (error) {
      console.error("Erreur:", error);
    }
  }, []);

  // Rafraîchir toutes les 30 secondes
  useAutoRefresh(loadData, 30000, true);

  return <div>{/* Contenu */}</div>;
};
```

**Paramètres:**
- `refreshFn` (Function) - Fonction qui charge les données
- `interval` (number) - Intervalle en ms (défaut: 30000 = 30s)
- `enabled` (boolean) - Activer/désactiver (défaut: true)

### Styles

#### CSS Animations (`loader.css`)
- `animate-spin` - Rotation continue (spinner)
- `animate-pulse` - Clignotement subtil
- `skeleton` - Animation de chargement skeleton

## Intégration dans GalleryPage

```jsx
import { Loader, LoaderError } from "../components/Loader";
import PhotoSkeleton from "../components/PhotoSkeleton";
import { useAutoRefresh } from "../hooks/useAutoRefresh";
import { useCallback } from "react";

const GalleryPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [photosByCategory, setPhotosByCategory] = useState({});

  // Fonction stable avec useCallback
  const loadPhotos = useCallback(async () => {
    try {
      setError(null);
      const photos = await PhotoService.getAllPhotos();
      setPhotosByCategory(photos);
    } catch (err) {
      setError("Erreur de chargement");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Auto-refresh toutes les 30 secondes
  useAutoRefresh(loadPhotos, 30000, true);

  // Affichage avec loader
  if (isLoading) {
    return <Loader message="Chargement des photos..." />;
  }

  if (error) {
    return <LoaderError message={error} onRetry={loadPhotos} />;
  }

  return (/* Galerie */);
};
```

## Comportement

### Chargement initial
1. Page monte → `useAutoRefresh` est appelé
2. Appel immédiat de `loadPhotos()`
3. Affichage du loader pendant le chargement
4. Affichage du contenu une fois chargé

### Polling automatique
- Toutes les 30 secondes, les données sont rafraîchies
- Pas de rafraîchissement si l'onglet est inactif (économise bande passante)

### Changement d'onglet
- Utilisateur quitte l'onglet → pause du polling
- Utilisateur revient à l'onglet → refresh immédiat + relance du polling

## Personnalisation

### Changer l'intervalle de polling
```jsx
// Rafraîchir toutes les 10 secondes
useAutoRefresh(loadPhotos, 10000, true);

// Rafraîchir toutes les 5 minutes
useAutoRefresh(loadPhotos, 5 * 60 * 1000, true);
```

### Désactiver le polling
```jsx
// Charger une seule fois
useAutoRefresh(loadPhotos, 30000, false);

// Ou utiliser un useEffect classique
useEffect(() => {
  loadPhotos();
}, []);
```

### Personnaliser le Loader
```jsx
// Taille petite
<Loader message="Chargement..." size="small" />

// Sans message
<Loader isLoading={true} message="" />

// Fullscreen (pour modal)
<Loader message="Chargement..." fullScreen={true} />
```

## Performance

### Bonnes pratiques
1. Utiliser `useCallback` pour la fonction de chargement
2. Mettre les dépendances correctes dans useCallback
3. Adapter l'intervalle selon les besoins
4. Désactiver le polling si non nécessaire

### Optimisations
- Le polling pause automatiquement si l'onglet est inactif
- Les séquences de requêtes sont éliminées (une seule requête active)
- Les erreurs temporaires affichent une notification mais n'arrêtent pas le polling

## Exemples d'utilisation

### AdminGallery (avec upload)
```jsx
const handleUploadSuccess = async () => {
  await loadPhotos(); // Rafraîchit immédiatement après upload
  setShowUploadForm(false);
};
```

### Recherche
```jsx
const [searchResults, setSearchResults] = useState([]);

const handleSearch = useCallback(async (query) => {
  if (!query) {
    setSearchResults([]);
    return;
  }
  const results = await PhotoService.search(query);
  setSearchResults(results);
}, []);

// Ne pas utiliser useAutoRefresh pour la recherche
// Utiliser useEffect à la place
useEffect(() => {
  handleSearch(query);
}, [query]);
```

## Troubleshooting

### Le loader s'affiche en boucle
- Vérifier que la fonction de chargement n'a pas d'erreur infinie
- Vérifier les dépendances de useCallback
- Ajouter des logs pour déboguer

### Les données ne se mettent pas à jour
- Vérifier que `enabled` est à `true`
- Vérifier l'intervalle (pas trop long)
- Vérifier que le serveur répond correctement

### Performance lente
- Augmenter l'intervalle de polling
- Désactiver le polling pendant les éditions
- Implémenter du debounce/throttle côté serveur
