import type AppModel from "./AppModel.ts";
import PageEnums from "./pages/PageEnums.ts";

export default class AppController {

    private model: AppModel;

    public constructor(model: AppModel) {
        this.model = model;
    }

    public showHomePage(): void {
        this.model.setCurrentPage(PageEnums.Home);
    }

    public showAboutMePage(): void {
        this.model.setCurrentPage(PageEnums.About);
    }

    public showBlogPage(): void {
        this.model.setCurrentPage(PageEnums.Blog);
    }

    public showContactPage(): void {
        this.model.setCurrentPage(PageEnums.Contact);
    }

    public loadPage(page: number) {
        this.model.loadPage(page).catch((error) => console.error("Failed to load page: ", error));
    }

}