# 🎨 Frontend - Mariage Galerie

Interface utilisateur React pour le site de mariage avec galerie photos et RSVP.

## 📑 Table des matières

1. [Démarrage rapide](#démarrage-rapide)
2. [Structure du projet](#structure-du-projet)
3. [Pages et Routes](#pages-et-routes)
4. [Composants](#composants)
5. [Services API](#services-api)
6. [Hooks personnalisés](#hooks-personnalisés)
7. [Styles et Thème](#styles-et-thème)
8. [État et Contexte](#état-et-contexte)
9. [Configuration](#configuration)
10. [Troubleshooting](#troubleshooting)

---

## Démarrage rapide

### Installation

```bash
npm install
npm run dev      # Dev server (http://localhost:5173)
npm run build    # Build production
npm run preview  # Prévisualiser production build
```

### Prérequis

- Node.js 18+
- Backend local en cours d'exécution (port 5000)

### Accès

- **Visiteur**: http://localhost:5173
- **Admin**: http://localhost:5173/mariageAdmin
- **Galerie**: http://localhost:5173/galerie

---

## Structure du projet

```
frontend/src/
├── pages/
│   ├── Home.jsx                 # Accueil
│   ├── OurStory.jsx             # Section histoire
│   ├── Programme.jsx            # Programme mariage
│   ├── Gifts.jsx                # Liste cadeaux
│   ├── GalleryPage.jsx          # Galerie complète
│   ├── AdminLogin.jsx           # Formulaire login admin
│   ├── AdminGallery.jsx         # Gestion galerie admin
│   ├── AdminRSVP.jsx            # Stats RSVP admin
│   └── AdminDashboard.jsx       # Dashboard admin
├── components/
│   ├── Header.jsx               # Navigation (navbar)
│   ├── Footer.jsx               # Pied de page
│   ├── RSVPModal.jsx            # Modal formulaire RSVP
│   ├── RSVP.jsx                 # Section RSVP
│   ├── UploadForm.jsx           # Modal upload photos
│   ├── Toast.jsx                # Notification individuelle
│   ├── ToastContainer.jsx       # Conteneur toasts
│   ├── Loader.jsx               # Spinner chargement
│   ├── PhotoSkeleton.jsx        # Skeleton loading
│   ├── ScrollToTop.jsx          # Retour haut page
│   ├── FavoritesPanel.jsx       # Panel favoris
│   ├── Countdown.jsx            # Compte à rebours
│   └── AdminDashboard.jsx       # Dashboard widgets
├── services/
│   ├── uploadService.js         # API photos
│   ├── photoService.js          # API photos (admin)
│   ├── rsvpService.js           # API RSVP
│   └── galleryService.js        # API galerie
├── hooks/
│   ├── useToast.js              # Gestion toasts
│   └── useAutoRefresh.js        # Refresh automatique
├── context/
│   └── ToastContext.jsx         # Contexte notifications
├── routes/
│   └── AppRoute.jsx             # Routage principal
├── styles/
│   └── index.css                # Styles globaux
├── assets/
│   └── images/                  # Images statiques
├── App.jsx                      # App root
├── main.jsx                     # Entry point
└── index.css                    # Base styles
```

---

## Pages et Routes

### Structure du routage

```
/                           → Accueil (Home + sections)
  ├── Galerie inline
  ├── RSVP section
  └── Infos mariage
  
/galerie                    → Page galerie dédiée (GalleryPage)
  ├── Affichage par catégories
  ├── Filtre par catégories
  └── Lightbox

/mariageAdmin               → Panneau administration
  ├── /mariageAdmin         → Login si pas connecté
  └── Après login:
      ├── Dashboard         → Stats
      ├── Galerie          → Gestion photos
      └── Réservations     → Gestion RSVPs
```

### Pages détaillées

#### Home.jsx
- Section héro
- Compte à rebours
- Infos mariage
- Bouton RSVP prominent

#### GalleryPage.jsx
- Affichage galerie complète
- Filtrage par catégories
- Grille photos responsive
- Lightbox avec navigation

#### AdminLogin.jsx
- Formulaire email + mot de passe
- Appel API `/api/auth/login`
- Gestion erreurs
- Sauvegarde localStorage

#### AdminGallery.jsx
- Dashboard avec statistiques
- Upload photos
- Gestion catégories
- Suppression photos (avec confirmation)
- Auto-refresh des données

#### AdminRSVP.jsx
- Voir tous les RSVPs
- Statistiques confirmations
- Analyse restrictions alimentaires
- Détails par personne

---

## Composants

### Toast System

**Toast.jsx** - Notification individuelle
```javascript
<Toast message="Message" type="success" onClose={() => {}} />
```

Propriétés:
- `message` (string): Texte du message
- `type` (success|error|warning|info): Type de notification
- `onClose` (function): Callback fermeture

**ToastContainer.jsx** - Conteneur
```javascript
<ToastContainer toast={toast} onClose={closeToast} />
```

### RSVPModal.jsx

Modal pour confirmer présence
```javascript
<RSVPModal isOpen={isOpen} onClose={handleClose} showToast={showToast} />
```

Propriétés:
- `isOpen` (bool): Ouvert/fermé
- `onClose` (function): Callback fermeture
- `showToast` (function): Afficher notification

### UploadForm.jsx

Modal upload photos (admin)
```javascript
<UploadForm onUploadSuccess={handleSuccess} onClose={handleClose} />
```

Propriétés:
- `onUploadSuccess` (function): Callback après upload
- `onClose` (function): Callback fermeture

### Loader.jsx

Spinner de chargement
```javascript
<Loader message="Chargement..." size="large" />
```

Propriétés:
- `message` (string): Texte affichage
- `size` (small|medium|large): Taille

---

## Services API

### uploadService.js

```javascript
// Uploader une image
uploadService.uploadImage(file, category)

// Uploader plusieurs
uploadService.uploadMultiple(files, category, onProgress)

// Récupérer toutes les photos
uploadService.getAllPhotos()

// Récupérer par catégorie
uploadService.getPhotosByCategory(category)

// Chercher
uploadService.searchPhotos(query)
```

### photoService.js (Admin)

```javascript
// Récupérer toutes les photos
photoService.getAllPhotos()

// Supprimer une photo
photoService.deletePhoto(photoId)

// Mettre à jour
photoService.updatePhoto(photoId, data)
```

### rsvpService.js

```javascript
// Soumettre RSVP
rsvpService.submitRSVP(formData)

// Récupérer tous les RSVPs (admin)
rsvpService.getAllRSVPs()

// Stats RSVP
rsvpService.getRSVPStats()

// Analyse alimentaire
rsvpService.getDietaryAnalysis()

// Supprimer RSVP
rsvpService.deleteRSVP(rsvpId)
```

### galleryService.js

```javascript
// Récupérer stats galerie
galleryService.getStats()
```

---

## Hooks personnalisés

### useToast.js

Gestion des notifications toast
```javascript
const { toast, showToast, closeToast } = useToast();

// Afficher un toast
showToast("Message", "success", 3000);

// Fermer manuel
closeToast();
```

Types: `success`, `error`, `warning`, `info`

### useAutoRefresh.js

Rafraîchissement automatique des données
```javascript
const { isRefreshing } = useAutoRefresh(callback, interval, runOnMount);

// Exemple: Actualiser chaque 20 secondes
useAutoRefresh(loadData, 20000, true);
```

---

## Styles et Thème

### Tailwind CSS

Tous les styles utilisent Tailwind avec configuration personnalisée.

**Couleurs du thème:**
- Rose/Pink: `#f43f5e`, `#ec4899`
- Neutres: Gris 50-900
- Accents: Vert, Bleu pour toasts

**Fonts:**
- **Playfair**: Titres élégants
- **Montserrat**: Texte général

### Fichiers CSS

- `src/index.css` - Styles globaux + customs
- Tailwind directives `@apply`
- Variables CSS personnalisées

### Classes utiles

```css
.btn-romantic              /* Boutons style mariage */
.btn-romantic-outline      /* Outline version */
.card-romantic             /* Cards elegantes */
.heading-elegant           /* Titres */
.section-elegant           /* Sections */
.divider-elegant           /* Diviseurs */
.text-gradient-rose        /* Gradient texte */
```

---

## État et Contexte

### AppRoute.jsx (État global)

```javascript
const [isRSVPOpen, setIsRSVPOpen] = useState(false);
const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
const { toast, showToast, closeToast } = useToast();
```

### ToastContext

```javascript
<ToastContext.Provider value={{ showToast, closeToast }}>
  {/* Tous les composants enfants ont accès */}
</ToastContext.Provider>

// Utilisation
const { showToast } = useToastContext();
```

### localStorage

**Admin login:**
```javascript
localStorage.setItem("isAdminLoggedIn", "true");
localStorage.getItem("isAdminLoggedIn");
```

**Admin token:**
```javascript
localStorage.setItem("adminToken", JSON.stringify(admin));
```

---

## Configuration

### Vite (vite.config.js)

Configuration pour développement et build.

### Tailwind (tailwind.config.js)

Personnalisations du thème Tailwind.

### Environment variables

`.env` (optionnel)
```
VITE_API_URL=http://localhost:5000
```

---

## Commandes

```bash
npm install             # Installer dépendances
npm run dev            # Dev server (5173)
npm run build          # Build production (dist/)
npm run preview        # Prévisualiser build
npm run lint           # ESLint check
npm run format         # Prettier format
```

---

## Dépendances principales

```json
{
  "react": "^18.x",
  "react-router-dom": "^6.x",
  "lucide-react": "^x.x",
  "axios": "^1.x"
}
```

- **React**: UI library
- **React Router**: Routage pages
- **Tailwind CSS**: Styles
- **Lucide React**: Icônes
- **Axios**: Requêtes HTTP

---

## Bonnes pratiques

### Composants

```javascript
// ✅ Bon: Destructuring props
function MyComponent({ title, isLoading }) {
  return <div>{title}</div>;
}

// ❌ Mauvais: Props globales
function MyComponent(props) {
  return <div>{props.title}</div>;
}
```

### Services API

```javascript
// ✅ Bon: Gestion d'erreur complète
try {
  const data = await service.fetch();
  showToast("Succès!", "success");
} catch (error) {
  showToast("Erreur: " + error.message, "error");
}

// ❌ Mauvais: Pas de gestion erreur
const data = await service.fetch();
```

### Styles

```javascript
// ✅ Bon: Classes Tailwind
<div className="px-4 py-3 rounded-lg bg-rose-100">

// ❌ Mauvais: Styles inline partout
<div style={{ padding: '16px 12px', borderRadius: '8px' }}>
```

---

## Troubleshooting

### Erreur: "Cannot find module"
```bash
npm install
# ou
npm ci  # Installation stricte
```

### Dev server ne démarre pas
```bash
# Vérifier port 5173 disponible
lsof -i :5173

# Changer port
npm run dev -- --port 5174
```

### API appels échouent
1. Vérifier backend en cours (localhost:5000)
2. Vérifier `VITE_API_URL` correct
3. Vérifier CORS configuré backend
4. Regarder console erreur réseau

### Build échoue
```bash
# Nettoyer cache
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Styles non appliqués
1. Vérifier Tailwind configuré
2. Vérifier classes Tailwind correctes
3. Vérifier CSS global chargé
4. Vider cache navigateur (Ctrl+Shift+Del)

### Toast ne s'affiche pas
1. Vérifier ToastContext.Provider dans AppRoute
2. Vérifier useToastContext() importé
3. Vérifier ToastContainer rendu
4. Vérifier showToast appelé correctement

---

## Performance

### Optimisations

- Lazy loading images
- Code splitting React Router
- Memoization composants
- Debounce recherche

### Monitoring

- Lighthouse CI
- React DevTools
- Network tab (DevTools)

---

## Déploiement

### Build production

```bash
npm run build
# Génère dist/
```

### Serveur avec Nginx

```nginx
server {
    location / {
        root /var/www/frontend/dist;
        try_files $uri /index.html;
    }
}
```

### Serveur simple

```bash
# Installer serve
npm install -g serve

# Servir build
serve -s dist -l 3000
```

---

## Fichiers importants

| Fichier | Rôle |
|---------|------|
| `App.jsx` | Root app |
| `AppRoute.jsx` | Routage + états |
| `ToastContext.jsx` | Notifications globales |
| `uploadService.js` | API photos |
| `rsvpService.js` | API RSVP |
| `index.css` | Styles globaux |
| `tailwind.config.js` | Config Tailwind |
| `vite.config.js` | Config Vite |

---

## Ressources

- [React Docs](https://react.dev)
- [React Router](https://reactrouter.com)
- [Tailwind CSS](https://tailwindcss.com)
- [Lucide Icons](https://lucide.dev)

---

**Version**: 1.0.0  
**Dernière mise à jour**: Février 2026
