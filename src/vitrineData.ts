export interface Product {
    id: string;
    slug: string;
    title: string;
    description: string;
    shortDescription: string;
    price: number;
    originalPrice?: number;
    category: string;
    rating: number;
    sales: number;
    reviewsCount: number;
    image: string;
    images: string[];
    prompt?: string;
    author: {
        name: string;
        image: string;
        level: 'New' | 'Top Seller' | 'Verified' | 'Expert';
        verified: boolean;
        responseTime: string;
        rating: number;
    };
    format: string;
    delivery: 'Imediato' | 'Email' | 'Link';
    features: string[];
    tags: string[];
    badge?: string;
    discount?: number;
    createdAt: string;
}

export const VITRINE_PRODUCTS: Product[] = [];
