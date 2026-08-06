export default interface Page {
    title: string;
    mount(main: HTMLElement): void;
}

export const PageID = {
    Home    : 0,
    About   : 1,
    Blog    : 2,
    Contact : 3,
    Unknown : 4
} as const;

export const PagePaths = {
    Home    : "/philip-rosenqvist/",
    About   : "/philip-rosenqvist/about",
    Blog    : "/philip-rosenqvist/blog",
    Contact : "/philip-rosenqvist/contact"
} as const;