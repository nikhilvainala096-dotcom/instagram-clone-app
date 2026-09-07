// Initial seed data for instaaaaa

export const CURRENT_USER_DEFAULT = {
  id: 'user_nikhil',
  username: 'nikhil_p',
  fullName: 'Nikhil Painala',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
  bio: 'Software Engineer & Creative Technologist 🚀 | Building next-gen web apps with React & AI 💻✨',
  website: 'https://github.com/nikhilpainala',
  postsCount: 12,
  followersCount: 1420,
  followingCount: 380,
  isVerified: true,
};

export const MOCK_USERS = [
  CURRENT_USER_DEFAULT,
  {
    id: 'user_sarah',
    username: 'sarah_adventures',
    fullName: 'Sarah Chen',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    bio: 'Wanderlust soul ✈️ | Capturing landscapes & vibrant city moments 📸',
    isVerified: true,
    followersCount: 48900,
    followingCount: 412,
  },
  {
    id: 'user_alex',
    username: 'alex.design',
    fullName: 'Alex Morgan',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80',
    bio: 'Product Designer & Minimalist 🎨 UI/UX at Figma ⚡️',
    isVerified: true,
    followersCount: 120500,
    followingCount: 650,
  },
  {
    id: 'user_elena',
    username: 'elena_sound',
    fullName: 'Elena Rostova',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    bio: 'Music producer & vinyl collector 🎧 Live sessions every Friday',
    isVerified: false,
    followersCount: 8200,
    followingCount: 290,
  },
  {
    id: 'user_marcus',
    username: 'marcus_fit',
    fullName: 'Marcus Vance',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    bio: 'Daily movement & healthy habits 💪 Athlete & coach',
    isVerified: false,
    followersCount: 23100,
    followingCount: 512,
  },
  {
    id: 'user_maya',
    username: 'maya_bakes',
    fullName: 'Maya Lin',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    bio: 'Artisan sourdough & pastries 🥐 Tokyo / San Francisco',
    isVerified: false,
    followersCount: 15400,
    followingCount: 190,
  }
];

export const INITIAL_STORIES = [
  {
    id: 'story_group_sarah',
    user: MOCK_USERS[1], // sarah_adventures
    hasUnseen: true,
    slides: [
      {
        id: 's_sarah_1',
        mediaUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80',
        caption: 'Sunrise over Yosemite Valley 🌄 Magic in the air!',
        timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
      },
      {
        id: 's_sarah_2',
        mediaUrl: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&auto=format&fit=crop&q=80',
        caption: 'Road trip stop at Pacific Coast Highway 🌊',
        timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
      }
    ]
  },
  {
    id: 'story_group_alex',
    user: MOCK_USERS[2], // alex.design
    hasUnseen: true,
    slides: [
      {
        id: 's_alex_1',
        mediaUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80',
        caption: 'Late night coding vibes 💻 Coffee & dark mode',
        timestamp: new Date(Date.now() - 1000 * 60 * 90).toISOString(),
      },
      {
        id: 's_alex_2',
        mediaUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=80',
        caption: 'Wireframing new dashboard concepts ✏️',
        timestamp: new Date(Date.now() - 1000 * 60 * 40).toISOString(),
      }
    ]
  },
  {
    id: 'story_group_elena',
    user: MOCK_USERS[3], // elena_sound
    hasUnseen: true,
    slides: [
      {
        id: 's_elena_1',
        mediaUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=80',
        caption: 'Studio session tonight with analog synthesizers 🎹',
        timestamp: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
      }
    ]
  },
  {
    id: 'story_group_marcus',
    user: MOCK_USERS[4], // marcus_fit
    hasUnseen: false,
    slides: [
      {
        id: 's_marcus_1',
        mediaUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop&q=80',
        caption: 'Morning 10k run completed 🏃‍♂️ Hydrate and conquer the day!',
        timestamp: new Date(Date.now() - 1000 * 60 * 360).toISOString(),
      }
    ]
  },
  {
    id: 'story_group_maya',
    user: MOCK_USERS[5], // maya_bakes
    hasUnseen: true,
    slides: [
      {
        id: 's_maya_1',
        mediaUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&auto=format&fit=crop&q=80',
        caption: 'Fresh baguettes straight out of the hearth oven 🥖',
        timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
      }
    ]
  }
];

export const INITIAL_POSTS = [
  {
    id: 'post_1',
    user: MOCK_USERS[1], // sarah_adventures
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1080&auto=format&fit=crop&q=80',
    caption: 'Waking up to this view in Yosemite Valley. Some places feel like a dream you never want to wake up from. 🌲🏔️✨ What is your favorite national park?',
    location: 'Yosemite National Park, California',
    timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    likesCount: 1420,
    isLiked: false,
    isSaved: false,
    comments: [
      {
        id: 'c_1',
        user: MOCK_USERS[2],
        text: 'Insane lighting! What camera body & lens was this?',
        timestamp: new Date(Date.now() - 1000 * 60 * 95).toISOString(),
        likesCount: 14,
        isLiked: false,
      },
      {
        id: 'c_2',
        user: MOCK_USERS[0],
        text: 'Adding this to my bucket list immediately! Incredible capture 📸🔥',
        timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
        likesCount: 6,
        isLiked: true,
      }
    ]
  },
  {
    id: 'post_2',
    user: MOCK_USERS[2], // alex.design
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1080&auto=format&fit=crop&q=80',
    caption: 'Exploration on glassmorphism and subtle holographic gradients in dark-themed interfaces. Minimalism meets fluidity. Thoughts on this aesthetic? 🔮💻',
    location: 'San Francisco, CA',
    timestamp: new Date(Date.now() - 1000 * 60 * 300).toISOString(),
    likesCount: 3890,
    isLiked: true,
    isSaved: true,
    comments: [
      {
        id: 'c_3',
        user: MOCK_USERS[1],
        text: 'The color harmony here is so soothing! 💜',
        timestamp: new Date(Date.now() - 1000 * 60 * 220).toISOString(),
        likesCount: 3,
        isLiked: false,
      },
      {
        id: 'c_4',
        user: MOCK_USERS[3],
        text: 'Would love to see this animated into an interaction demo!',
        timestamp: new Date(Date.now() - 1000 * 60 * 150).toISOString(),
        likesCount: 8,
        isLiked: false,
      }
    ]
  },
  {
    id: 'post_3',
    user: MOCK_USERS[5], // maya_bakes
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=1080&auto=format&fit=crop&q=80',
    caption: 'Flaky almond croissants with vanilla bean cream filling. Spent 3 days perfecting the lamination process and the layers finally turned out perfect! 🥐☕️',
    location: 'Tartine Bakery, San Francisco',
    timestamp: new Date(Date.now() - 1000 * 60 * 500).toISOString(),
    likesCount: 842,
    isLiked: false,
    isSaved: false,
    comments: [
      {
        id: 'c_5',
        user: MOCK_USERS[4],
        text: 'Cheat day breakfast sorted! 🤤',
        timestamp: new Date(Date.now() - 1000 * 60 * 400).toISOString(),
        likesCount: 5,
        isLiked: false,
      }
    ]
  },
  {
    id: 'post_4',
    user: MOCK_USERS[0], // nikhil_p
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1080&auto=format&fit=crop&q=80',
    caption: 'Shipping instaaaaa today! 🚀 Built with React, Vite, and Tailwind CSS. Clean, responsive, and packed with smooth interactions. Check it out and drop feedback! ⚡️👨‍💻',
    location: 'Tech Hub, Silicon Valley',
    timestamp: new Date(Date.now() - 1000 * 60 * 800).toISOString(),
    likesCount: 954,
    isLiked: true,
    isSaved: false,
    comments: [
      {
        id: 'c_6',
        user: MOCK_USERS[2],
        text: 'Super clean UI! Love the story viewer and double tap animation 🙌',
        timestamp: new Date(Date.now() - 1000 * 60 * 700).toISOString(),
        likesCount: 12,
        isLiked: true,
      },
      {
        id: 'c_7',
        user: MOCK_USERS[1],
        text: 'Congrats on the launch Nikhil! 🚀',
        timestamp: new Date(Date.now() - 1000 * 60 * 650).toISOString(),
        likesCount: 4,
        isLiked: false,
      }
    ]
  }
];

export const EXPLORE_POSTS = [
  {
    id: 'exp_1',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80',
    likesCount: 4120,
    commentsCount: 94,
    aspect: 'tall',
    title: 'Tropical paradise in Bora Bora'
  },
  {
    id: 'exp_2',
    image: 'https://images.unsplash.com/photo-1477959858617-67f30bc75b82?w=800&auto=format&fit=crop&q=80',
    likesCount: 8900,
    commentsCount: 230,
    aspect: 'square',
    title: 'Chicago skyline reflections'
  },
  {
    id: 'exp_3',
    image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&auto=format&fit=crop&q=80',
    likesCount: 2450,
    commentsCount: 62,
    aspect: 'square',
    title: 'Moody northern lights in Norway'
  },
  {
    id: 'exp_4',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80',
    likesCount: 6540,
    commentsCount: 180,
    aspect: 'tall',
    title: 'Circuit boards and microchip architecture'
  },
  {
    id: 'exp_5',
    image: 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?w=800&auto=format&fit=crop&q=80',
    likesCount: 1890,
    commentsCount: 45,
    aspect: 'square',
    title: 'Trekking the alpine ridge'
  },
  {
    id: 'exp_6',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80',
    likesCount: 3120,
    commentsCount: 78,
    aspect: 'square',
    title: 'Healthy vibrant salad bowl'
  },
  {
    id: 'exp_7',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&auto=format&fit=crop&q=80',
    likesCount: 5210,
    commentsCount: 112,
    aspect: 'tall',
    title: 'Interior scandinavian room aesthetic'
  },
  {
    id: 'exp_8',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop&q=80',
    likesCount: 7420,
    commentsCount: 140,
    aspect: 'square',
    title: 'Modern developer setup'
  },
  {
    id: 'exp_9',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&auto=format&fit=crop&q=80',
    likesCount: 9800,
    commentsCount: 310,
    aspect: 'square',
    title: 'Live concert fireworks and music festival'
  }
];

