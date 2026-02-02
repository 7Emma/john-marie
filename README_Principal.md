# 💍 Site de Mariage - Documentation

Site web complet pour mariage avec galerie photos, confirmations RSVP et panneau admin.

## 📚 Documentation

La documentation est organisée en deux parties principales:

### 🎨 [Frontend](./frontend/README.md)
React interface utilisateur
- Pages et routes
- Composants réutilisables
- Services API
- Styles Tailwind
- Hooks personnalisés

**Accès**: http://localhost:5173

### ⚙️ [Backend](./backend/README.md)
API REST Node.js/Express
- Endpoints API complets
- Modèles MongoDB
- Authentification admin
- Upload fichiers
- Système RSVP

**Accès**: http://localhost:5000

---

## 🚀 Démarrage rapide

### 1. Installation

```bash
# Frontend
cd frontend
npm install
npm run dev

# Backend (dans un autre terminal)
cd backend
npm install
npm run dev
```

### 2. Configuration MongoDB

```bash
# Local (défaut)
# MongoDB doit être en cours d'exécution
mongod

# Ou utiliser MongoDB Atlas (cloud)
# Voir backend/.env
```

### 3. Créer admin

```bash
cd backend
npm run create-admin

# Email: john.marie0.mariage@site.com
# Mot de passe: john123marie
```

### 4. Accéder

- **Accueil**: http://localhost:5173
- **Galerie**: http://localhost:5173/galerie
- **Admin**: http://localhost:5173/mariageAdmin

---

## 📂 Structure du projet

```
mariage/
├── frontend/                    # Interface utilisateur React
│   ├── README.md               # Documentation frontend
│   ├── src/
│   │   ├── pages/              # Pages principales
│   │   ├── components/         # Composants réutilisables
│   │   ├── services/           # Appels API
│   │   ├── hooks/              # Hooks personnalisés
│   │   ├── context/            # Contexte global
│   │   └── styles/             # Styles CSS
│   └── package.json
│
├── backend/                     # API REST Node.js
│   ├── README.md               # Documentation backend
│   ├── src/
│   │   ├── config/             # Configuration DB
│   │   ├── models/             # Schémas MongoDB
│   │   ├── routes/             # Endpoints API
│   │   ├── services/           # Logique métier
│   │   └── middleware/         # Middlewares
│   ├── uploads/                # Stockage images
│   ├── scripts/                # Scripts utiles
│   └── package.json
│
└── README.md                    # Ce fichier
```

---

## 🏗️ Architecture

```
┌─────────────────────────────────────┐
│         Frontend (React)             │
│   Port 5173 - http://localhost      │
│                                     │
│  Pages:                             │
│  • Accueil                          │
│  • Galerie                          │
│  • Admin Login                      │
│  • Admin Dashboard                  │
└────────────────┬────────────────────┘
                 │
        ┌────────▼─────────┐
        │  UploadService   │
        │  RSVPService     │
        │  PhotoService    │
        └────────┬─────────┘
                 │
        ┌────────▼──────────────┐
        │  Backend (Express)    │
        │  Port 5000            │
        └────────┬──────────────┘
                 │
    ┌────────────┴────────────┐
    │                         │
    ▼                         ▼
 MongoDB              Uploads Folder
 (Données)            (Images JPG/PNG)
```

---

## 🔐 Authentification Admin

### Identifiant par défaut

```
Email: john.marie0.mariage@site.com
Mot de passe: john123marie
```

### Créer nouvel admin

```bash
cd backend
npm run create-admin
```

### Connexion

1. Accéder http://localhost:5173/mariageAdmin
2. Saisir email et mot de passe
3. Valider

---

## 📸 Galerie Photos

### Catégories

- 💑 Couple
- 👥 Amis
- 👨‍👩‍👧‍👦 Famille
- 🎉 Ensemble
- 🏛️ Mairie

### Upload (Admin)

1. Connecté en admin
2. Aller à l'onglet "Galerie"
3. Cliquer "Ajouter une photo"
4. Sélectionner fichier + catégorie
5. Valider

### Affichage public

- Page galerie avec filtrage par catégorie
- Lightbox pour visualisation
- Téléchargement disponible

---

## 📋 Système RSVP

### Pour les invités

1. Cliquer "Confirmer ma présence"
2. Remplir formulaire
3. Soumettre

### Informations

- Nom complet
- Email
- Téléphone
- Nombre de convives
- Restrictions alimentaires
- Message optionnel

### Pour l'admin

1. Connecté en admin
2. Onglet "Réservations"
3. Voir confirmations
4. Analyse restrictions alimentaires

---

## 🔔 Notifications

Système unifié de toasts (notifications):

- ✅ Succès (vert)
- ❌ Erreur (rouge)
- ⚠️ Avertissement (jaune)
- ℹ️ Information (bleu)

Les notifications s'affichent en bas-droit de l'écran et disparaissent après 3 secondes.

---

## 📝 API Endpoints

### Authentification
- `POST /api/auth/login` - Connexion
- `POST /api/auth/register` - Créer admin

### Photos
- `GET /api/photos` - Toutes les photos
- `GET /api/photos/:category` - Par catégorie
- `POST /api/upload` - Uploader (admin)
- `DELETE /api/photos/:id` - Supprimer (admin)

### RSVP
- `POST /api/rsvp` - Soumettre
- `GET /api/rsvp/admin` - Voir tous (admin)
- `GET /api/rsvp/stats` - Statistiques

Pour la liste complète, voir [Documentation Backend](./backend/README.md#api-endpoints).

---

## 🛠️ Commandes

### Frontend

```bash
cd frontend
npm install              # Installer dépendances
npm run dev            # Développement (5173)
npm run build          # Build production
npm run preview        # Prévisualiser build
```

### Backend

```bash
cd backend
npm install            # Installer dépendances
npm run dev           # Développement avec watch
npm start             # Production
npm run create-admin  # Créer admin
```

---

## 🔒 Sécurité

### Implémentée

✅ Mots de passe hashés (bcryptjs)
✅ Validation champs
✅ Limite taille fichiers (5 MB)
✅ CORS configuré
✅ Nettoyage données

### À améliorer

⚠️ JWT tokens (en développement)
⚠️ Rate limiting
⚠️ HTTPS (en production)
⚠️ 2FA optionnel

---

## 🚢 Déploiement

### Prérequis

- Node.js 18+
- MongoDB 4.4+
- Serveur web (Nginx, Apache)
- SSL/TLS

### Étapes

```bash
# 1. Backend
cd backend
npm install
NODE_ENV=production npm start

# 2. Frontend
cd frontend
npm install
npm run build
# Servir dist/ avec serveur web
```

---

## 📖 Ressources

### Frontend
- [React Documentation](https://react.dev)
- [React Router](https://reactrouter.com)
- [Tailwind CSS](https://tailwindcss.com)

### Backend
- [Express Documentation](https://expressjs.com)
- [MongoDB Documentation](https://docs.mongodb.com)
- [Mongoose Documentation](https://mongoosejs.com)

---

## 🐛 Troubleshooting

### MongoDB ne se connecte pas
```bash
# Vérifier MongoDB tourne
mongod

# Ou utiliser Atlas (cloud)
# Voir backend/.env
```

### Port déjà utilisé
```bash
# Frontend sur 5173
PORT=5174 npm run dev

# Backend sur 5000
PORT=5001 npm start
```

### Module manquant
```bash
cd frontend  # ou backend
npm install
```

### Build échoue
```bash
npm ci            # Installation stricte
npm run build
```

Pour plus de détails:
- [Frontend Troubleshooting](./frontend/README.md#troubleshooting)
- [Backend Troubleshooting](./backend/README.md#troubleshooting)

---

## 📞 Support

Pour chaque partie du projet, consultez:
- **Frontend**: [frontend/README.md](./frontend/README.md)
- **Backend**: [backend/README.md](./backend/README.md)

---

## 📝 Licence

Projet personnel - Tous droits réservés © 2026

---

## 📊 Statut du projet

| Composant | Statut | Notes |
|-----------|--------|-------|
| Frontend | ✅ Complet | React avec Tailwind |
| Backend | ✅ Complet | Express + MongoDB |
| Galerie | ✅ Complète | Upload/Gestion photos |
| RSVP | ✅ Complet | Confirmations + stats |
| Admin | ✅ Complet | Dashboard + contrôles |
| Authentification | ✅ Implémentée | Email/Mot de passe |
| Notifications | ✅ Toast system | Succès/Erreur/Info |
| JWT Tokens | ⏳ À venir | Security enhancement |
| Rate Limiting | ⏳ À venir | DDoS protection |

---

**Version**: 1.0.0  
**Dernière mise à jour**: Février 2026

---

**👉 Commencer**: 
1. Lire [Frontend README](./frontend/README.md)
2. Lire [Backend README](./backend/README.md)
3. Suivre guide démarrage rapide ci-dessus
