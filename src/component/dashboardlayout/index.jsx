import Header from 'component/header';
import React from 'react'
import DashboardRoutes from 'routes/dashboardRoutes';

const DashboardLayout = () => {
    return (
        <>
            <div>
                <div>
                    <header>
                        <Header/>
                    </header>
                </div>
                <div>
                    <DashboardRoutes/>
                </div>
            </div>
        </>
    )
}

export default DashboardLayout;
