import { Menu } from '@/pages/Menu'
import { Separator } from '@/components/ui/separator'
import { Outlet } from 'react-router-dom'

export function DefaultLayout() {
  return (
    <div className="max-w-full h-screen grid sm:grid-cols-[0.2fr_1fr_0.2fr] grid-rows-[0.2fr_1fr]">
      <div className="flex justify-center">
        <Menu />
        <Separator
          orientation="vertical"
          className="hidden sm:inline ml-auto"
        />
      </div>
      <div className="flex h-screen overflow-y-scroll">
        <div className="m-5 w-full">
          <Outlet />
        </div>
      </div>
      <div className="hidden sm:inline"></div>
    </div>
  )
}
