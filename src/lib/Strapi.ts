import { env } from '$env/dynamic/private';

class Strapi {

    private protocol: string;
    private host: string;
    private port: number;
    private readOnlyApiKey: string;

    constructor(readOnlyApiKey: string, host: string, port: number, protocol: string) {
        console.log('[Log]:     Strapi instance created');
        this.readOnlyApiKey = readOnlyApiKey;
        this.host = host;
        this.port = port;
        this.protocol = protocol;
    }

    async getBlogPosts(limit: number = 12, latest: boolean = false) {
        console.log(`[Log]:     Fetching ${limit} blog posts`);
        const qs = `?populate=*&pagination[pageSize]=${limit}&sort=publishedAt:${latest ? 'desc' : 'asc'}`;
        const url = `${this.protocol}://${this.host}:${this.port}/api/blog-posts${qs}`;
        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer ${this.readOnlyApiKey}`
            }
        });
        if (!response.ok) {
            throw response;
        }
        console.log(`[Log]:     Fetched ${limit} blog posts successfully`);
        return await response.json();
    }

    async getBlogPost(slug: string) {
        console.log(`[Log]:     Fetching blog post with slug ${slug}`);
        const qs = `?populate=*&filters[slug][$eq]=${slug}`;
        const url = `${this.protocol}://${this.host}:${this.port}/api/blog-posts${qs}`;
        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer ${this.readOnlyApiKey}`
            }
        });
        if (!response.ok) {
            throw response;
        }
        console.log(`[Log]:     Fetched blog post with slug ${slug} successfully`);
        return await response.json();
    }

}

const strapi = new Strapi(env.STRAPI_READ_ONLY_KEY ?? '', 'localhost', 1337, 'http');
export default strapi;