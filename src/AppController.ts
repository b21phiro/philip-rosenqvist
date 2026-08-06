import type AppModel from "./AppModel.ts";
import { PageID } from "./pages/Page.ts";

export default class AppController {

    private model: AppModel;

    public constructor(model: AppModel) {
        this.model = model;
    }

    public showPage(pageID: number): void {
        switch (pageID) {
            case PageID.Home:
                this.model.setCurrentPage(PageID.Home)
                    .catch((error) => console.error("Failed to load home page: ", error));
                break;
            case PageID.About:
                this.model.setCurrentPage(PageID.About)
                    .catch((error) => console.error("Failed to load about page: ", error));
                break;
            case PageID.Blog:
                this.model.setCurrentPage(PageID.Blog)
                    .catch((error) => console.error("Failed to load the blog page: ", error));
                break;
            case PageID.Contact:
                this.model.setCurrentPage(PageID.Contact)
                    .catch((error) => console.error("Failed to load the contact page: ", error));
                break;
            case PageID.Unknown:
            default:
                // #TODO: Fix proper 404 page.
                console.error("Error 404");
                break;
        }
    }

    public loadPage(page: number) {
        this.model.loadPage(page)
            .catch((error) => console.error("Failed to load page: ", error));
    }

}