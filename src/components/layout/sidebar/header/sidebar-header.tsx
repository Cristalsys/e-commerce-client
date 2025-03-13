import { FileUser, ShieldCheck } from 'lucide-react'

export function SidebarHeader({ hasAdmin }: { hasAdmin: boolean }) {
	return (
		<div className='flex py-3 items-center gap-5 border-b pb-4 border-gray-300'>
			<div>{hasAdmin ? <ShieldCheck /> : <FileUser />}</div>

			{hasAdmin ? <b>Admin Panel</b> : <b>Personal Account</b>}
		</div>
	)
}
