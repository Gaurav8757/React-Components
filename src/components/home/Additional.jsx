<Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
<Menu.Item>
  {({ active }) => (
    <a
      href="#"
      className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
    >
      Your Profile
    </a>
  )}
</Menu.Item>
<Menu.Item>
  {({ active }) => (
    <a
      href="#"
      className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
    >
      Settings
    </a>
  )}
</Menu.Item>
<Menu.Item>
  {({ active }) => (
    <a
      href="#"
      className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
    >
      Sign out
    </a>
  )}
</Menu.Item>
