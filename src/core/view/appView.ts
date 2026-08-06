import './../../assets/css/layout/app.css';
import Header from "../layout/header.ts";
import Footer from "../layout/footer.ts";

export default (routeView: string): string => {
    return `${ Header() }<main id="main">${ routeView }</main>${ Footer() }`;
}