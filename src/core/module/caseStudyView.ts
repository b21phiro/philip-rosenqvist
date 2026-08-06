import Github from "../module/icons/github.ts";
import ExternalLink from "./icons/external-link.ts";
import CaseStudy from "../models/caseStudy.ts";

export default (model: CaseStudy): string => {

    const repo = (model.github)
        ? `<a class="button-icon-round" href="${model.github}" title="Open GitHub-repo for this project">
            ${ Github() }
        </a>`
        : "";

    const website = (model.website)
        ? `<a class="button-icon-round" href="${model.website}" title="Open the website"">
            ${ ExternalLink() }
        </a>`
        : "";

    let tags: string = "";
    model.tags.forEach((tag: string) => {
        tags += `<li class="tag">${tag}</li>`;
    });

    const img = (model.img)
        ? `<figure class="case-image"><img src="${model.img}" title="${model.img}" alt="${model.title}" /></figure>`
        : "";

    return `
    <article class="case-study">
        ${ img }
        <section>
            <h3 class="text-title">${ model.title }</h3>
            <ul class="tags">${ tags }</ul>
            <p class="text-bread">${ model.description }</p>
        </section>
        <nav class="case-buttons">
            ${ repo }
            ${ website }
        </nav>
    </article>
    `;
}