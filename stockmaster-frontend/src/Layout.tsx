import React, { Fragment } from 'react';
import { Footer, Navbar } from './app/components';

const Layout: React.FC = ({ children }) => (
<Fragment>
    <Navbar />
    {children}
    <Footer />
</Fragment>
);

export default Layout;