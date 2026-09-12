export interface Metadata {
  // Basic Metadata
  title?: string | { default: string; template: string; absolute: string };
  description?: string;
  keywords?: string | string[];
  authors?: Array<{ name: string; url?: string }>;
  creator?: string;
  publisher?: string;
  metadataBase?: URL | string | null;

  // OpenGraph (Facebook, LinkedIn, Discord)
  openGraph?: {
    title?: string;
    description?: string;
    url?: string | URL;
    siteName?: string;
    locale?: string;
    type?: 'website' | 'article' | 'book' | 'profile' | string;
    images?: Array<{
      url: string | URL;
      secureUrl?: string | URL;
      alt?: string;
      type?: string;
      width?: string | number;
      height?: string | number;
    }>;
    videos?: Array<{
      url: string | URL;
      secureUrl?: string | URL;
      type?: string;
      width?: string | number;
      height?: string | number;
    }>;
    audio?: Array<{
      url: string | URL;
      secureUrl?: string | URL;
      type?: string;
    }>;
  };

  // Twitter (X) Card
  twitter?: {
    card?: 'summary' | 'summary_large_image' | 'app' | 'player';
    site?: string;
    siteId?: string;
    creator?: string;
    creatorId?: string;
    title?: string;
    description?: string;
    images?: string | string[] | Array<{ url: string; alt?: string }>;
  };

  // Search Engine Crawling (Robots)
  robots?: {
    index?: boolean;
    follow?: boolean;
    nocache?: boolean;
    googleBot?: {
      index?: boolean;
      follow?: boolean;
      noimageindex?: boolean;
      'max-video-preview'?: number | string;
      'max-image-preview'?: 'none' | 'standard' | 'large';
      'max-snippet'?: number;
    };
  };

  // Icons & Favicons
  icons?: {
    icon?: string | Array<{ url: string; sizes?: string; type?: string }>;
    shortcut?: string | string[];
    apple?: string | Array<{ url: string; sizes?: string; type?: string }>;
    other?: Array<{ rel: string; url: string; sizes?: string; type?: string }>;
  };

  // Verification Tokens
  verification?: {
    google?: string | string[];
    yahoo?: string;
    yandex?: string;
    meidu?: string;
    other?: Record<string, string | string[]>;
  };

  // Canonical and Alternates
  alternates?: {
    canonical?: string | URL | null;
    languages?: Record<string, string | URL>;
    media?: Record<string, string | URL>;
    types?: Record<string, string | URL>;
  };

  // Application Details
  manifest?: string | URL | null;
  applicationName?: string;
  referrer?: 'no-referrer' | 'no-referrer-when-downgrade' | 'origin' | 'origin-when-cross-origin' | 'same-origin' | 'strict-origin' | 'strict-origin-when-cross-origin' | 'unsafe-url';
  category?: string;
  classification?: string;

  // Viewport & Styling (Separated in newer Next.js versions but often typed here)
  viewport?: string | number | Record<string, string | number | boolean>;
  themeColor?: string | Array<{ media: string; color: string }>;
  colorScheme?: 'normal' | 'light' | 'dark' | 'only light' | 'light dark' | string;
}



/**
 * Merges parent (default) and child (props) metadata using field-level inspection.
 * Child properties have absolute preference.
 */
export function mergeMetadata(parent: Metadata, child?: Metadata): Metadata {
    if (!child) return parent;

    // Helper to extract titles whether they are strings or structured objects
    const resolveTitle = (t: any): string | undefined => 
        typeof t === 'string' ? t : t?.default;

    const childTitle = resolveTitle(child.title);
    const parentTitle = resolveTitle(parent.title);
    
    // Core fallback values for cross-field synchronization
    const finalTitle = childTitle ?? parentTitle;
    const finalDescription = child.description ?? parent.description;

    return {
        title: finalTitle,
        description: finalDescription,
        colorScheme: child.colorScheme ?? parent.colorScheme,
        themeColor: child.themeColor ?? parent.themeColor,
        
        authors: child.authors ?? parent.authors,
        
        alternates: {
            canonical: child.alternates?.canonical ?? parent.alternates?.canonical
        },
        
        openGraph: {
            type: child.openGraph?.type ?? parent.openGraph?.type,
            url: child.openGraph?.url ?? parent.openGraph?.url,
            title: child.openGraph?.title ?? childTitle ?? parent.openGraph?.title ?? parentTitle,
            description: child.openGraph?.description ?? child.description ?? parent.openGraph?.description ?? parent.description,
        },
        
        twitter: {
            card: child.twitter?.card ?? parent.twitter?.card,
            site: child.twitter?.site ?? parent.twitter?.site,
            title: child.twitter?.title ?? childTitle ?? parent.twitter?.title ?? parentTitle,
            description: child.twitter?.description ?? child.description ?? parent.twitter?.description ?? parent.description,
        }
    };
}
