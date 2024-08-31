var v=Object.defineProperty;var m=(e,t,s)=>t in e?v(e,t,{enumerable:!0,configurable:!0,writable:!0,value:s}):e[t]=s;var o=(e,t,s)=>m(e,typeof t!="symbol"?t+"":t,s);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))a(i);new MutationObserver(i=>{for(const n of i)if(n.type==="childList")for(const l of n.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&a(l)}).observe(document,{childList:!0,subtree:!0});function s(i){const n={};return i.integrity&&(n.integrity=i.integrity),i.referrerPolicy&&(n.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?n.credentials="include":i.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function a(i){if(i.ep)return;i.ep=!0;const n=s(i);fetch(i.href,n)}})();const f=()=>`
    <div class="logo">
        <a href="/" title="Philip Rosenqvist"></a>
        <svg width="182" height="110" viewBox="0 0 182 110" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M26.037 17.8619C26.037 44.7087 25.9928 71.6035 27.4419 98.412M4.49451 23.4817C13.1438 5.36722 47.0162 -5.50657 58.7149 15.4683C64.3633 25.5953 64.7933 41.5424 54.8643 49.239C45.1825 56.744 31.3456 57.093 19.9489 59.5419M48.0478 67.0349C48.0478 62.4011 50.4036 68.5872 50.8576 70.0529C53.1627 77.4939 55.3715 100.736 55.5408 92.9483C55.6271 88.976 56.1154 72.7281 62.0972 73.071C68.2081 73.4213 68.5473 89.1205 70.9952 92.7922M77.0833 77.3378C77.2456 81.3974 77.9845 85.4841 78.4882 89.514M73.8051 64.225C72.881 62.3191 72.7102 62.1974 74.2734 60.9468M84.5763 66.5666C84.5054 65.6449 83.5605 61.9722 84.5243 64.6933C87.5205 73.1532 88.6957 82.1045 90.1961 90.919M97.2208 71.718C97.0589 77.547 97.6159 83.1978 98.1574 89.0457M95.8158 59.5419C95.4796 59.243 95.2776 59.2064 94.8792 59.0736M102.841 77.3378C102.977 76.2495 104.206 78.1144 104.298 78.2484C109.219 85.4554 110.096 97.3053 112.207 105.437M105.65 85.2992C105.69 79.5231 106.946 72.9383 112.675 69.8968C118.493 66.8083 122.498 73.154 122.796 78.0663C123.488 89.4796 116.317 89.0973 107.992 85.7675M141.711 46.8974C141.711 60.5751 145.254 74.2799 147.799 87.6408M135.623 52.0489C135.205 45.5283 139.998 43.114 146.134 41.4337C151.054 40.0863 159.214 39.1736 161.276 45.7526C163.148 51.7256 157.883 57.9106 154.797 62.2217C153.394 64.1822 150.001 67.7739 150.088 70.8075C150.225 75.5466 157.699 79.1673 160.86 81.2405C166.766 85.1149 172.859 88.6972 179.176 91.8556" stroke="#F2E3D5" stroke-width="3" stroke-linecap="round"/>
            <path d="M23.7073 20.8619C23.7073 47.7087 23.6632 74.6035 25.1123 101.412M2.16486 26.4817C10.8141 8.36722 44.6865 -2.50657 56.3853 18.4683C62.0336 28.5953 62.4637 44.5424 52.5347 52.239C42.8528 59.744 29.0159 60.093 17.6192 62.5419M45.7181 70.0349C45.7181 65.4011 48.0739 71.5872 48.528 73.0529C50.8331 80.4939 53.0418 103.736 53.2111 95.9483C53.2975 91.976 53.7857 75.7281 59.7675 76.071C65.8784 76.4213 66.2177 92.1205 68.6655 95.7922M74.7536 80.3378C74.916 84.3974 75.6548 88.4841 76.1585 92.514M71.4754 67.225C70.5513 65.3191 70.3806 65.1974 71.9437 63.9468M82.2466 69.5666C82.1757 68.6449 81.2309 64.9722 82.1946 67.6933C85.1908 76.1532 86.3661 85.1045 87.8664 93.919M94.8911 74.718C94.7292 80.547 95.2863 86.1978 95.8278 92.0457M93.4862 62.5419C93.15 62.243 92.948 62.2064 92.5496 62.0736M100.511 80.3378C100.647 79.2495 101.876 81.1144 101.968 81.2484C106.89 88.4554 107.766 100.305 109.877 108.437M103.321 88.2992C103.361 82.5231 104.617 75.9383 110.346 72.8968C116.163 69.8083 120.169 76.154 120.466 81.0663C121.158 92.4796 113.987 92.0973 105.662 88.7675M139.381 49.8974C139.381 63.5751 142.924 77.2799 145.469 90.6408M133.293 55.0489C132.875 48.5283 137.669 46.114 143.804 44.4337C148.724 43.0863 156.884 42.1736 158.946 48.7526C160.818 54.7256 155.553 60.9106 152.468 65.2217C151.065 67.1822 147.671 70.7739 147.759 73.8075C147.895 78.5466 155.369 82.1673 158.53 84.2405C164.437 88.1149 170.529 91.6972 176.846 94.8556" stroke="#2A95BF" stroke-width="3" stroke-linecap="round"/>
            <path d="M26.6963 15.8619C26.6963 42.7087 26.6522 69.6035 28.1013 96.412M5.15387 21.4817C13.8031 3.36722 47.6755 -7.50657 59.3743 13.4683C65.0226 23.5953 65.4527 39.5424 55.5237 47.239C45.8418 54.744 32.0049 55.093 20.6082 57.5419M48.7071 65.0349C48.7071 60.4011 51.0629 66.5872 51.517 68.0529C53.8221 75.4939 56.0309 98.7363 56.2002 90.9483C56.2865 86.976 56.7747 70.7281 62.7566 71.071C68.8675 71.4213 69.2067 87.1205 71.6545 90.7922M77.7426 75.3378C77.905 79.3974 78.6438 83.4841 79.1476 87.514M74.4644 62.225C73.5404 60.3191 73.3696 60.1974 74.9327 58.9468M85.2356 64.5666C85.1647 63.6449 84.2199 59.9722 85.1836 62.6933C88.1798 71.1532 89.3551 80.1045 90.8554 88.919M97.8801 69.718C97.7182 75.547 98.2753 81.1978 98.8168 87.0457M96.4752 57.5419C96.139 57.243 95.937 57.2064 95.5386 57.0736M103.5 75.3378C103.636 74.2495 104.865 76.1144 104.957 76.2484C109.879 83.4554 110.755 95.3053 112.866 103.437M106.31 83.2992C106.35 77.5231 107.606 70.9383 113.335 67.8968C119.152 64.8083 123.158 71.154 123.455 76.0663C124.147 87.4796 116.976 87.0973 108.651 83.7675M142.37 44.8974C142.37 58.5751 145.913 72.2799 148.458 85.6408M136.282 50.0489C135.864 43.5283 140.658 41.114 146.793 39.4337C151.713 38.0863 159.873 37.1736 161.935 43.7526C163.807 49.7256 158.542 55.9106 155.457 60.2217C154.054 62.1822 150.66 65.7739 150.748 68.8075C150.884 73.5466 158.358 77.1673 161.519 79.2405C167.426 83.1149 173.518 86.6972 179.835 89.8556" stroke="#0D0D0D" stroke-width="3" stroke-linecap="round"/>
        </svg>
    </div>`,b=()=>`
        <header id="header">
            ${f()}
        </header>`,M=()=>`
        <footer id="footer">
            <h4>Philip Rosenqvist</h4>
            <p>This site was built while listening to some very heavy metal. Sorry for the sass, I’m usually normal.</p>
        </footer>`,y=e=>`${b()}<main id="main">${e}</main>${M()}`;class k{constructor(t){o(this,"routes",[]);this.routes=t}match(t){return this.routes.find(s=>s.path===t.pathname)}}class ${constructor(t,s,a){o(this,"path");o(this,"view");o(this,"options");this.path=t,this.view=s,this.options=a}}const d=()=>'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-github"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>',A=()=>'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0d0d0d" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>',u=()=>'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-mail"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>';class r{}o(r,"TITLE","Philip Rosenqvist"),o(r,"LINKEDIN","https://www.linkedin.com/in/philip-rosenqvist-453556195/"),o(r,"INSTAGRAM","https://www.instagram.com/rosenqvistphilip/"),o(r,"MAIL","philip.rosenqvist@outlook.com"),o(r,"TEL","+460762848666"),o(r,"GITHUB","https://github.com/b21phiro");const x=()=>'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-external-link"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>',c=e=>{const t=e.github?`<a class="button-icon-round" href="${e.github}" title="Open GitHub-repo for this project">
            ${d()}
        </a>`:"",s=e.website?`<a class="button-icon-round" href="${e.website}" title="Open the website"">
            ${x()}
        </a>`:"";let a="";return e.tags.forEach(n=>{a+=`<li class="tag">${n}</li>`}),`
    <article class="case-study">
        ${e.img?`<figure class="case-image"><img src="${e.img}" title="${e.img}" alt="${e.title}" /></figure>`:""}
        <section>
            <h3 class="text-title">${e.title}</h3>
            <ul class="tags">${a}</ul>
            <p class="text-bread">${e.description}</p>
        </section>
        <nav class="case-buttons">
            ${t}
            ${s}
        </nav>
    </article>
    `};class h{constructor(t,s,a=[]){o(this,"title");o(this,"description");o(this,"tags",[]);o(this,"github");o(this,"website");o(this,"img");this.title=t,this.description=s,this.tags=a}}const L=()=>'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-phone-outgoing"><polyline points="23 7 23 1 17 1"></polyline><line x1="16" y1="8" x2="23" y2="1"></line><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>',p=new h("Studenupproret.se","A custom single page application (SPA), built during a national campaign for students within Sweden. ",["HTML","CSS","JavaScript"]);p.github="https://github.com/ntoonio/studentupproret";p.website="https://studentupproret.se/";const g=new h("Penguin Breaker Babylon","A breaker-type of game. The game is made with BabylonJS, rendering 3D-models in a 2D-perspective",["JavaScript","BabylonJS"]);g.github="https://github.com/b21phiro/penguin-breaker-babylon";const w=new h("Peg Solitarie TS","English and European peg-solitaire game made using HTML5-canvas and TypeScript.",["HTML5 Canvas","TypeScript"]);w.github="https://github.com/b21phiro/peg-solitaire-ts";const C=new h("Convalescence (Minecraft mod)","A mod I'm developing together with a good friend of mine. The mod is developed for Minecraft Java, so the mod is also written with Java. We develop the mod trough a CI/CD-development pipeline.",["Java","Mod","CI/CD"]);C.github="https://github.com/b21phiro/mc_convalescence";const P=`
    <div id="landing">
        <section>
            <h1 class="text-normal text-bold">My name is Philip Rosenqivst</h1>
            <p class="text-title">
                I just graduated as a web developer from the University of Skövde. I love coding as well as UI/UX design
            </p>
            <nav class="nav-row-list">
                <ul>
                    <li class="button">
                        <a href="/#projects" title="Projects"></a>
                        <p>Check out my stuff</p>
                    </li>
                    <li class="button-icon">
                        <a href="${r.GITHUB}" title="Philip's GitHub"></a>
                        ${d()}
                    </li>
                    <li class="button-icon">
                        <a href="${r.LINKEDIN}" title="Philip's Linkedin"></a>
                        ${A()}
                    </li>
                    <li class="button-icon">
                        <a href="mailto:${r.MAIL}" title="Philip's Mail"></a>
                        ${u()}
                    </li>
                </ul>
            </nav>
        </section>
        <figure id="hero" class="switch-blade-figure">
            <img src="/images/ANGRA_Philip_1.jpg" alt="Philip standing in the livingroom, photo taken by Angie Gray.">
            <img src="/images/ANGRA_Philip_3.jpg" alt="Philip standing in the livingroom, photo taken by Angie Gray.">
            <img src="/images/ANGRA_Philip_4.jpg" alt="Philip standing in the livingroom, photo taken by Angie Gray.">
        </figure>
    </div>
    <div id="projects">
        <h2 class="text-large-title">Projects</h2>
        <ul class="case-studies">
            <li>${c(p)}</li>
            <li>${c(g)}</li>
            <li>${c(w)}</li>
            <li>${c(C)}</li>
        </ul>
    </div>
    <div>
        <section>
            <h2 class="text-large-title">Ey, get in touch?</h2>
            <p class="text-normal text-bold">
                Want to hire me? Want to ask me questions? Want to grab a coffee? 
                You can contact me by email or phone. If you don’t have a mail or a phone, 
                try to light a very bright beacon on the tallest mountain.
            </p>
            <address class="contact-info">
                <nav>
                    <a class="button" href="mailto:${r.MAIL}" title="Open up your favorite mail-service and send me an email!">
                        ${u()}
                        <span>${r.MAIL}</span>
                    </a>
                     <a class="button" href="tel:${r.TEL}" title="Call me!">
                        ${L()}
                        <span>${r.TEL}</span>
                     </a>
                </nav>
            </address>
        </section>
    </div>
`,I=()=>P;class T{constructor(t){o(this,"root");o(this,"router");this.root=t;const s=[new $("/philip-rosenqvist",I,{title:"Portfolio"})];this.router=new k(s)}run(){const t=this.router.match(window.location);if(!t){console.error("Error 404");return}this.updateView(t)}updateView(t){var i;this.updateDocTitle((i=t.options)==null?void 0:i.title),this.clearRootView();const s=t.view(),a=y(s);this.root.insertAdjacentHTML("beforeend",a),document.querySelectorAll("a").forEach(n=>{n.addEventListener("click",l=>{n.host===window.location.host&&!n.hash&&(l.preventDefault(),this.updateView(t))})})}clearRootView(){for(;this.root.firstChild;)this.root.removeChild(this.root.firstChild)}updateDocTitle(t=""){document.title=`${t} | ${r.TITLE}`}}window.onload=()=>{const e=document.getElementById("app");if(!e){console.error("No app element was found.");return}new T(e).run()};
