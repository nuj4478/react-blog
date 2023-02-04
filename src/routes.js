import HomePage from './pages/HomePage';
import CreatePage from './pages/CreatePage';
import EditPage from './pages/EditPage';
import ListPage from './pages/ListPage';
import ShowPage from './component/ShowPage';
import AdminPage from './pages/AdminPage';

const routes = [
    {
        path: '/',
        Component: HomePage
    },
    {
        path: '/blogs',
        Component: ListPage
    },
    {
        path: '/admin',
        Component: AdminPage
    },
    {
        path: '/blogs/create',
        Component: CreatePage
    },
    {
        path: '/blogs/:id/edit',
        Component: EditPage
    },
    {
        path: '/blogs/:id',
        Component: ShowPage 
    },
];

export default routes;