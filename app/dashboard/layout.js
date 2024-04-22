import Link from "next/link";

export default function RootLayout({ children }) {

    return (



        <div className="w-full h-screen flex">

            <div className="w-[20%] bg-primary-dark-blue2 flex flex-col text-primary-light-blue gap-2 px-4 py-6">
                <Link href="/dashboard">
                    Dashboard
                </Link>

                <Link href="/dashboard/users">
                    Users
                </Link>
                <Link href="/dashboard/permission">
                    Permissions
                </Link>

            </div>
            <div className="w-[80%]"> {children}</div>

        </div>






    );
}