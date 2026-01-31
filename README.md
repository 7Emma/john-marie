# 💍 Site de Mariage - John & Marie

Un site élégant et romantique pour célébrer l'union de deux cœurs. Créé avec une attention particulière au design, à la fluidité et à l'expérience utilisateur.

---

## ✨ Caractéristiques Principales

### **Design Raffiné**
- 🎨 Palette rose & or sophistiquée
- 💫 Animations fluides et élégantes
- 🌹 Typography élégante (Playfair Display, Montserrat, Great Vibes)
- ✨ Dégradés et ombres romantiques

### **Fonctionnalités**
- 🎯 **Hero Section Optimisée** - Tout le contenu visible en une vue
- ⏱️ **Compte à Rebours Dynamique** - Décompte en temps réel (15 jours)
- 📝 **Formulaire RSVP Modal** - Confirmation avec animation élégante
- 🎁 **Page Cadeaux** - Idées, cagnotte, cadeaux symboliques
- 📖 **Notre Histoire** - Timeline interactive des jalons importants
- 📅 **Programme du Jour** - Chronologie élégante de l'événement
- 📱 **Responsive Design** - Parfait sur mobile, tablette et desktop
- ⬆️ **Bouton Back to Top** - Navigation fluide

### **Performance & UX**
- ⚡ Build optimisé avec Vite
- 🎯 Scroll lisse et naturel
- 🎭 Transitions subtiles
- ♿ Accessibilité incluse
- 📱 Mobile-first design

---

## 🛠️ Tech Stack

| Catégorie | Technologies |
|-----------|--------------|
| **Framework** | React 19+ |
| **Build Tool** | Vite 7 |
| **CSS** | Tailwind CSS 3 |
| **Icônes** | Lucide React |
| **Fonts** | Google Fonts (Playfair Display, Montserrat, Great Vibes) |
| **Package Manager** | Yarn 1.22 |

---

## 📁 Structure du Projet

```
src/
├── components/
│   ├── Header.jsx          # Navigation responsive
│   ├── Footer.jsx          # Pied de page
│   ├── Countdown.jsx       # Compte à rebours
│   ├── RSVP.jsx            # Formulaire RSVP (page complète)
│   ├── RSVPModal.jsx       # Modal RSVP animé
│   └── ScrollToTop.jsx     # Bouton retour en haut
├── pages/
│   ├── Home.jsx            # Hero section
│   ├── OurStory.jsx        # Notre histoire (timeline)
│   ├── Programme.jsx       # Programme du jour J
│   └── Gifts.jsx           # Page cadeaux
├── App.jsx                 # Composant root
├── main.jsx                # Point d'entrée
├── index.css               # Styles globaux
└── assets/                 # Images et ressources

dist/                        # Build production
public/                      # Fichiers statiques
tailwind.config.js          # Configuration Tailwind
vite.config.js              # Configuration Vite
```

---

## 🚀 Démarrage

### **Installation**
```bash
# Cloner le projet
git clone <repository-url>
cd frontend

# Installer les dépendances
yarn install
```

### **Développement**
```bash
# Lancer le serveur de développement
yarn dev

# Accéder à http://localhost:5173
```

### **Production**
```bash
# Créer la build
yarn build

# Aperçu de la production
yarn preview
```

---

## 📋 Sections du Site

### 1️⃣ **Hero Section**
- Titre principal "John & Marie"
- Informations du mariage (date, lieu)
- Compte à rebours dynamique
- Message d'invitation
- Boutons d'action (Notre Histoire, Nous Contacter)

### 2️⃣ **Notre Histoire**
- Timeline interactive des jalons importants
- 4 étapes clés du couple
- Citations romantiques
- Design alternant gauche/droite (responsive)

### 3️⃣ **Programme du Jour**
- Chronologie complète de l'événement
- 7 événements avec horaires
- Icônes et emplacements
- Informations pratiques
- Contacts directs

### 4️⃣ **Formulaire RSVP**
- Modal élégant qui glisse depuis la droite
- Champs : Nom, Email, Téléphone, Convives, Régimes, Message
- Message de confirmation animé
- Contacts alternatifs (Email, Téléphone)

### 5️⃣ **Page Cadeaux**
- 3 catégories de cadeaux (Maison, Électroménager, Cartes)
- 3 projets de contribution (Voyage, Foyer, Projet Commun)
- Cadeaux du cœur (Messages, Conseils, Vœux)
- Information sur les contributions financières
- Message de remerciement

### 6️⃣ **Footer**
- Logo et noms
- Informations du mariage
- Contacts (téléphone, email)
- Adresse complète
- Message final

---

## 🎨 Palette de Couleurs

- **Principal** : Rose (#ec4899)
- **Secondaire** : Rose clair (#fce7f3)
- **Accent** : Or (#ca8a04)
- **Texte** : Gris sombre (#1f2937)
- **Fond** : Blanc (#ffffff)

---

## 🎭 Animations & Effets

| Animation | Description |
|-----------|------------|
| `animate-float` | Éléments flottants subtils |
| `animate-glow-pulse` | Cœur avec pulsation lumineuse |
| `animate-bounce` | Indicateur de scroll |
| `transition-elegant` | Transitions 500ms fluides |
| `shadow-romantic` | Ombre romantique au hover |
| `slide-in` | Modal RSVP coulisse depuis la droite |

---

## 📱 Responsive Design

- **Mobile** : 320px+
- **Tablette** : 768px+
- **Desktop** : 1024px+
- **Large Screens** : 1280px+

Tous les éléments s'adaptent parfaitement à chaque taille d'écran.

---

## ⚙️ Configurations

### **Tailwind Config**
- Polices personnalisées (Playfair, Montserrat, Great Vibes)
- Couleurs rose & or
- Ombres romantiques
- Animations personnalisées

### **Vite Config**
- Plugin React inclus
- Optimisation automatique

---

## 🔧 Variables Clés

### **Date du Mariage**
```javascript
// Calculée dynamiquement : +15 jours à partir d'aujourd'hui à 16h
const weddingDate = new Date();
weddingDate.setDate(weddingDate.getDate() + 15);
```

### **Contacts**
- **Emma** : 06 12 34 56 78
- **Thomas** : 06 98 76 54 32
- **Email** : emma.thomas.mariage@email.com

### **Lieu**
- **Château de Malmaison**
- **Rueil-Malmaison, Île-de-France**

---

## 💻 Développeur

**Emmanuel AGBOTOEDO Mahoukpego**
- Développeur Full Stack React
- Promoteur : [Manoutech Corporate](mailto:manoutechcorporate@gmail.com)
- Email : manoutechcorporate@gmail.com

---

## 📄 License

MIT License - Libre d'utilisation

---

## 🎯 Améliorations Futures

- [ ] Intégration galerie photos
- [ ] Commentaires et livre d'or
- [ ] Gestion backend pour les RSVP
- [ ] Paiement en ligne pour les cadeaux
- [ ] Multi-langue (FR/EN)
- [ ] Dark mode
- [ ] PWA (Progressive Web App)

---

## 🤝 Support

Pour toute question ou suggestion concernant le site, contactez :
- **Email** : manoutechcorporate@gmail.com
- **Téléphone Emma** : 06 12 34 56 78
- **Téléphone Thomas** : 06 98 76 54 32

---

## ✨ Crédits

- **Design** : Élégant et romantique
- **Photography** : Unsplash
- **Icons** : Lucide React
- **Fonts** : Google Fonts
- **Framework** : React + Tailwind CSS

---

Fait avec 💕 pour célébrer l'amour
