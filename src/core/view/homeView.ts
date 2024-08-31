import Github from "../module/icons/github.ts";
import Linkedin from "../module/icons/linkedin.ts";
import Mail from "../module/icons/mail.ts";
import Config from "../config.ts";
import CaseStudyView from "../module/caseStudyView.ts";
import CaseStudy from "../models/caseStudy.ts";
import PhoneOutgoing from "../module/icons/phone-outgoing.ts";

const case1: CaseStudy = new CaseStudy("Studenupproret.se",
    "A custom single page application (SPA), built during a national campaign for students within Sweden. ",
["HTML", "CSS", "JavaScript"]
);
case1.github = "https://github.com/ntoonio/studentupproret";
case1.website = "https://studentupproret.se/";

const case2: CaseStudy = new CaseStudy("Penguin Breaker Babylon",
    "A breaker-type of game. The game is made with BabylonJS, rendering 3D-models in a 2D-perspective",
    ["JavaScript", "BabylonJS"]
);
case2.github = "https://github.com/b21phiro/penguin-breaker-babylon";

const case3: CaseStudy = new CaseStudy(
    "Peg Solitarie TS",
    "English and European peg-solitaire game made using HTML5-canvas and TypeScript.",
    ["HTML5 Canvas", "TypeScript"]
);
case3.github = "https://github.com/b21phiro/peg-solitaire-ts";

const case4: CaseStudy = new CaseStudy(
    "Convalescence (Minecraft mod)",
    "A mod I'm developing together with a good friend of mine. The mod is developed for Minecraft Java, so the mod is also written with Java. We develop the mod trough a CI/CD-development pipeline.",
    ["Java", "Mod", "CI/CD"]
);
case4.github = "https://github.com/b21phiro/mc_convalescence";


const html: string = `
    <div id="landing">
        <section>
            <h1 class="text-normal text-bold">My name is Philip Rosenqivst</h1>
            <p class="text-title">
                I just graduated as a web developer from the University of Skövde. I love coding as well as UI/UX design
            </p>
            <nav class="nav-row-list">
                <ul>
                    <li class="button">
                        <a href="/philip-rosenqvist/#projects" title="Projects"></a>
                        <p>Check out my stuff</p>
                    </li>
                    <li class="button-icon">
                        <a href="${Config.GITHUB}" title="Philip's GitHub"></a>
                        ${ Github() }
                    </li>
                    <li class="button-icon">
                        <a href="${Config.LINKEDIN}" title="Philip's Linkedin"></a>
                        ${ Linkedin() }
                    </li>
                    <li class="button-icon">
                        <a href="mailto:${Config.MAIL}" title="Philip's Mail"></a>
                        ${ Mail() }
                    </li>
                </ul>
            </nav>
        </section>
        <figure id="hero" class="switch-blade-figure">
            <img src="/philip-rosenqvist/images/ANGRA_Philip_1.jpg" alt="Philip standing in the livingroom, photo taken by Angie Gray.">
            <img src="/philip-rosenqvist/images/ANGRA_Philip_3.jpg" alt="Philip standing in the livingroom, photo taken by Angie Gray.">
            <img src="/philip-rosenqvist/images/ANGRA_Philip_4.jpg" alt="Philip standing in the livingroom, photo taken by Angie Gray.">
        </figure>
    </div>
    <div id="projects">
        <h2 class="text-large-title">Projects</h2>
        <ul class="case-studies">
            <li>${ CaseStudyView(case1) }</li>
            <li>${ CaseStudyView(case2) }</li>
            <li>${ CaseStudyView(case3) }</li>
            <li>${ CaseStudyView(case4) }</li>
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
                    <a class="button" href="mailto:${Config.MAIL}" title="Open up your favorite mail-service and send me an email!">
                        ${ Mail() }
                        <span>${ Config.MAIL }</span>
                    </a>
                     <a class="button" href="tel:${Config.TEL}" title="Call me!">
                        ${ PhoneOutgoing() }
                        <span>${ Config.TEL }</span>
                     </a>
                </nav>
            </address>
        </section>
    </div>
`;

export default (): string => {
    return html;
}