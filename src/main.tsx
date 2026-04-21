import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { AlignmentProvider } from './context/AlignmentContext.tsx';

createRoot(document.getElementById("root")!).render(
    <AlignmentProvider>
        <App />
    </AlignmentProvider>);

