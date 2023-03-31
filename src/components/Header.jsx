import { Bars3Icon } from '@heroicons/react/24/outline'
import useApp from "../hooks/useApp"

function Header() {

  const { isActiveResponsive, setIsActiveResponsive } = useApp();

  return (
    <header className="px-8 border-b-2 border-neutral-300 bg-neutral-50 h-20 flex items-center">
      <div className="flex gap-5">
        <button
          className="text-neutral-900 hover:text-neutral-600 rounded transition-colors md:hidden"
          type="button"
          onClick={() => setIsActiveResponsive(!isActiveResponsive)}
        >
          <Bars3Icon className="h-7 w-7" />
        </button>
        <h1 className="text-2xl font-bold text-blue-900">Sistema de Evaluación</h1>
      </div>

    </header>
  )
}

export default Header