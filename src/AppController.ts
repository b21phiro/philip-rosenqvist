import type AppModel from "./AppModel.ts";
import PageEnums from "./pages/PageEnums.ts";

export default class AppController {

    private model: AppModel;

    public constructor(model: AppModel) {
        this.model = model;
    }

    public showHomePage(): void {
        this.model.setCurrentPage(PageEnums.Home)
            .catch((error) => console.error("Failed to load home page: ", error));
    }

    public showAboutMePage(): void {
        this.model.setCurrentPage(PageEnums.About)
            .catch((error) => console.error("Failed to load about page: ", error));
    }

    public showBlogPage(): void {
        this.model.setCurrentPage(PageEnums.Blog)
            .catch((error) => console.error("Failed to load the blog page: ", error));
    }

    public showContactPage(): void {
        this.model.setCurrentPage(PageEnums.Contact)
            .catch((error) => console.error("Failed to load the contact page: ", error));
    }

    public loadPage(page: number) {
        this.model.loadPage(page).catch((error) => console.error("Failed to load page: ", error));
    }

}