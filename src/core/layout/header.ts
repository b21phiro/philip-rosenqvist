import './../../assets/css/layout/header.css';
import Logo from "../module/logo.ts";

export default (): string => {
    return `
        <header id="header">
            ${ Logo() }
        </header>`;
}