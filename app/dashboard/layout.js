
import DashboardClient from "./layoutClient";

export default function DashboardLayout({ children }) {
    return (
        <DashboardClient>
            {children}
        </DashboardClient>
    );
}