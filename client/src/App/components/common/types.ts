export type UserType = {
    _id?: string,
    token?: string,
    email?: string,
    username: string,
    role?: RoleType,
}

export type RoleType = 'Admin' | 'Customer';

export type VisibilityType = 'loggedin' | 'owner' ;

export type giftKind = 'other' | 'book' | 'boardgame' | 'videogame' | 'cooking' | 'cloth' | 'jewel' | 'game' | 'techno' | 'sport' | 'association';

export type GiftType= {
    id?: string,
    owner?: string,
    name?: string,
    types?: giftKind[],
    price?: {min?: number, max?: number, average?: number},
    reservations?: {userName: string, price?: number}[]
    visibility?: VisibilityType, //(rank of visibility wanted by the card owner)  ---------- two last fields shown in case of owner wants to know on their lists
}

export type HorizontalType= 'center' | 'start' | 'end' | 'stretch' | 'baseline';

export type VariantType= 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'subtitle1' | 'subtitle2' | 'body1' | 'body2' | 'caption' | 'button' | 'overline' | 'srOnly' | 'inherit';

export type LayoutType = {
    style?: any,
    column?: boolean,
    rowReverse?: boolean,
    columnReverse?: boolean,
    justifyContent?: 'start' | 'flex-start' | 'center' | 'end' | 'flex-end' | 'spaced' | 'space-between' | 'around' | 'space-around' | 'space-evenly';
    alignItems?: 'start' | 'center' | 'end' | 'stretch' | 'baseline',
    alignSelf?: 'start' | 'center' | 'end' | 'stretch' | 'baseline',
    alignContent?: 'start' | 'flex-start' | 'center' | 'end' | 'flex-end' | 'spaced' | 'space-between' | 'around' | 'space-around' | 'stretch',
    wrap?: boolean,
    wrapReverse?: boolean,
    flexGrow?: number,
    flexShrink?: number,
    flexBasis?: string,
    flex?: string,
    width?: string,
    height?: string,
    breakpoints?: any,
    element?: 'article' | 'aside' | 'div' | 'figure' | 'footer' | 'form' | 'header' | 'main' | 'nav' | 'section',
    componentRef?: any,
    className?: string,
    children: React.ReactNode,
}

export type RowType = {
    style?: any,
    reverse?: boolean,
    vertical?: 'start' | 'center' | 'end' | 'stretch' | 'baseline',
    horizontal?: 'start' | 'flex-start' | 'center' | 'end' | 'flex-end' | 'spaced' | 'space-between' | 'around' | 'space-around' | 'space-evenly',
    justifyContent?: 'start' | 'flex-start' | 'center' | 'end' | 'flex-end' | 'spaced' | 'space-between' | 'around' | 'space-around' | 'space-evenly',
    alignItems?: 'start' | 'center' | 'end' | 'stretch' | 'baseline',
    alignSelf?: 'start' | 'center' | 'end' | 'stretch' | 'baseline',
    alignContent?: 'start' | 'flex-start' | 'center' | 'end' | 'flex-end' | 'spaced' | 'space-between' | 'around' | 'space-around' | 'stretch',
    wrap?: boolean,
    wrapReverse?: boolean,
    flex?: string,
    width?: string,
    height?: string,
    flexGrow?: number,
    flexShrink?: number,
    flexBasis?: string,
    breakpoints?: object,
    element?: 'article' | 'aside' | 'div' | 'figure' | 'footer' | 'form' | 'header' | 'main' | 'nav' | 'section',
    className?: string,
    children: React.ReactNode
}

export type ColumnType = {
    style?: any,
    reverse?: boolean,
    horizontal?: 'center' | 'start' | 'end' | 'stretch' | 'baseline',
    vertical?: 'start' | 'flex-start' | 'center' | 'end' | 'flex-end' | 'spaced' | 'space-between' | 'around' | 'space-around' | 'space-evenly',
    justifyContent?: 'start' | 'flex-start' | 'center' | 'end' | 'flex-end' | 'spaced' | 'space-between' | 'around' | 'space-around' | 'space-evenly',
    alignItems?: 'start' | 'center' | 'end' | 'stretch' | 'baseline',
    alignSelf?: 'start' | 'center' | 'end' | 'stretch' | 'baseline',
    alignContent?: 'start' | 'flex-start' | 'center' | 'end' | 'flex-end' | 'spaced' | 'space-between' | 'around' | 'space-around' | 'stretch',
    wrap?: boolean,
    wrapReverse?: boolean,
    flex?: string,
    width?: string,
    height?: string,
    flexGrow?: number,
    flexShrink?: number,
    flexBasis?: string,
    breakpoints?: any,
    element?: 'article' | 'aside' | 'div' | 'figure' | 'footer' | 'form' | 'header' | 'main' | 'nav' | 'section',
    className?: string,
    children: React.ReactNode
}
