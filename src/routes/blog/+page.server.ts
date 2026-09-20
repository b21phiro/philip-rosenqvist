import type { PageServerLoad } from './$types';
import strapi from '$lib/Strapi';
import {error} from "@sveltejs/kit";

export const load: PageServerLoad = async ({ url }) => {

    const searchParams = new URLSearchParams(url.search);
    const page = Number(searchParams.get('page')) ?? 1;

    if (isNaN(page)) {
        console.error('[Error]:   Invalid page number');
        error(404, {
            message: "Invalid page number"
        });
    }

    try {
        const blogPosts = await strapi.getBlogPosts(25, true, page);
        return {
            blogPosts: blogPosts.data ?? [],
            blogMeta: blogPosts.meta ?? {},
            error: null
        };
    } catch (error) {
        console.error('[Error]:   Failed to fetch blog posts', error);
        return {
            blogPosts: [],
            blogMeta: {},
            error: "Failed to fetch blog posts"
        }
    }
}