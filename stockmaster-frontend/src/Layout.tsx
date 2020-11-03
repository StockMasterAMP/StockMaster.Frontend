import React, { Fragment } from 'react';
import { Footer, Navbar } from './app/components';

const Layout: React.FC = ({ children }) => (
<Fragment>
    <Navbar />
    <div className="footerVH">
        {children}
    </div>
    <Footer />
</Fragment>
);

export default Layout;