import type { PageServerLoad } from './$types';
import strapi from '$lib/Strapi';
import { error } from "@sveltejs/kit";


export const load: PageServerLoad = async ({ params }) => {
    const slug = params.slug ?? '';
    if (!slug || slug.length < 1) {
        return error(404, "Blog post not found");
    }
    try {
        const blogPost = await strapi.getBlogPost(slug);
        return {
            blogPost,
            error: null
        };
    } catch (error) {
        console.error('[Error]:   Failed to fetch blog posts', error);
        return {
            blogPost: null,
            error: "Failed to fetch blog posts"
        }
    }
}