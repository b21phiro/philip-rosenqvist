export default class CaseStudy {

    public title: string;
    public description: string;
    public tags: Array<string> = [];

    public github?: string;
    public website?: string;
    public img?: string;

    constructor(title: string, description: string, tags: Array<string> = []) {
        this.title = title;
        this.description = description;
        this.tags = tags;
    }

}