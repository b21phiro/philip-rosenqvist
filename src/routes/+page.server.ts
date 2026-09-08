import type { PageServerLoad } from './$types';
import strapi from '$lib/Strapi';

export const load: PageServerLoad = async () => {
    try {
        const recentBlogPosts = await strapi.getBlogPosts(3, true);
        return {
            recentBlogPosts: recentBlogPosts.data ?? [],
            error: null
        };
    } catch (error) {
        console.error('[Error]:   Failed to fetch blog posts', error);
        return {
            recentBlogPosts: [],
            error: "Failed to fetch blog posts"
        }
    }
}