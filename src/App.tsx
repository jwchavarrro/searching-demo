/**
 * App.tsx
 * @description: Este componente gestiona el layout principal de la aplicación.
 */

import { Icon } from '@iconify/react'
import { ICONS } from '@config'
import { Avatar, Button, Text, Title } from '@/components/atomic-desing/atoms'
import {
  AvatarButton,
  CardA,
  Header,
} from '@/components/atomic-desing/molecules'

function App() {
  return (
    <div className="app">
      {/* Sidebar */}
      <aside className="sidebar">
        <header className="sidebar-header">
          <Title title="Rick and Morty list" level={1} size="2xl" />
        </header>

        {/* Personajes favoritos y personajes */}
        <main className="sidebar-main">
          <section className="sidebar-section-starred">
            <Text text="STARRED CHARACTERS" weight="semibold" />
          </section>
          <section className="sidebar-section-characters">
            <Text text="CHARACTERS" weight="semibold" />
          </section>
        </main>
      </aside>

      {/* Main Content Area */}
      <main className="main-content overflow-y-scroll">
        <div className="space-y-12 p-8">
          {/* Header Component */}
          <section className="space-y-4">
            <Title title="Header Component" level={2} size="2xl" />
            <div className="flex gap-8">
              <Header
                avatar={{
                  avatar: {
                    src: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
                    alt: 'Rick Sanchez',
                    size: 'xl',
                  },
                }}
                title={{ title: 'Rick Sanchez', level: 3, size: 'lg' }}
              />
              <Header
                avatar={{
                  avatar: {
                    initials: 'MS',
                    size: 'xl',
                  },
                }}
                title={{ title: 'Morty Smith', level: 3, size: 'lg' }}
              />
              <Header
                avatar={{
                  avatar: {
                    src: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
                    alt: 'Summer Smith',
                    size: 'xl',
                  },
                  icon: 'mdi:heart',
                  iconSize: 20,
                }}
                title={{ title: 'Summer Smith', level: 3, size: 'lg' }}
              />
            </div>
          </section>

          {/* Avatar Variants */}
          <section className="space-y-4">
            <Title title="Avatar Component" level={2} size="2xl" />
            <div className="flex items-end gap-4">
              <div className="flex flex-col items-center gap-2">
                <Avatar size="xs" initials="XS" />
                <Text text="xs" size="xs" />
              </div>
              <div className="flex flex-col items-center gap-2">
                <Avatar size="sm" initials="SM" />
                <Text text="sm" size="xs" />
              </div>
              <div className="flex flex-col items-center gap-2">
                <Avatar size="base" initials="BA" />
                <Text text="base" size="xs" />
              </div>
              <div className="flex flex-col items-center gap-2">
                <Avatar size="lg" initials="LG" />
                <Text text="lg" size="xs" />
              </div>
              <div className="flex flex-col items-center gap-2">
                <Avatar size="xl" initials="XL" />
                <Text text="xl" size="xs" />
              </div>
              <div className="flex flex-col items-center gap-2">
                <Avatar size="2xl" initials="2X" />
                <Text text="2xl" size="xs" />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Avatar
                src="https://rickandmortyapi.com/api/character/avatar/1.jpeg"
                alt="Rick Sanchez"
                size="lg"
              />
              <Avatar alt="Morty Smith" size="lg" />
              <Avatar initials="AB" size="lg" />
            </div>
          </section>

          {/* AvatarButton Component */}
          <section className="space-y-4">
            <Title title="AvatarButton Component" level={2} size="2xl" />
            <div className="flex items-center gap-6">
              <AvatarButton
                avatar={{
                  src: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
                  alt: 'Rick Sanchez',
                  size: 'xl',
                }}
                icon="mdi:heart"
                iconSize={20}
              />
              <AvatarButton
                avatar={{
                  initials: 'MS',
                  size: 'xl',
                }}
                icon="mdi:star"
                iconSize={20}
              />
              <AvatarButton
                avatar={{
                  src: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
                  alt: 'Morty Smith',
                  size: '2xl',
                }}
                icon="mdi:heart"
                iconSize={24}
              />
            </div>
          </section>

          {/* CardA Component */}
          <section className="space-y-4">
            <Title title="CardA Component" level={2} size="2xl" />
            <div className="space-y-4">
              <div className="max-w-md">
                <CardA
                  avatar={{
                    src: 'https://rickandmortyapi.com/api/character/avatar/5.jpeg',
                    alt: 'Jerry Smith',
                  }}
                  title={{
                    title: 'Jerry Smith',
                  }}
                  description={{
                    text: 'Human',
                  }}
                />
              </div>
              <div className="max-w-md">
                <CardA
                  avatar={{
                    src: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
                    alt: 'Rick Sanchez',
                  }}
                  title={{
                    title: 'Rick Sanchez',
                  }}
                  description={{
                    text: 'Human',
                  }}
                />
              </div>
              <div className="max-w-md">
                <CardA
                  avatar={{
                    initials: 'MS',
                    size: 'lg',
                  }}
                  title={{
                    title: 'Morty Smith',
                  }}
                  description={{
                    text: 'Human',
                  }}
                />
              </div>
            </div>
          </section>

          {/* Button Variants */}
          <section className="space-y-4">
            <Title title="Button Component" level={2} size="2xl" />
            <div className="space-y-6">
              <div className="space-y-2">
                <Text text="Variantes" size="sm" weight="semibold" />
                <div className="flex flex-wrap gap-2">
                  <Button variant="default">Default</Button>
                  <Button variant="default" disabled>
                    Default (Disabled)
                  </Button>
                  <Button variant="destructive">Destructive</Button>
                  <Button variant="destructive" disabled>
                    Destructive (Disabled)
                  </Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="outline" disabled>
                    Outline (Disabled)
                  </Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="secondary" disabled>
                    Secondary (Disabled)
                  </Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="ghost" disabled>
                    Ghost (Disabled)
                  </Button>
                  <Button variant="link">Link</Button>
                  <Button variant="link" disabled>
                    Link (Disabled)
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Text text="Tamaños" size="sm" weight="semibold" />
                <div className="flex flex-wrap items-center gap-2">
                  <Button size="sm">Small</Button>
                  <Button size="base">Base</Button>
                  <Button size="lg">Large</Button>
                  <Button variant="secondary" size="icon">
                    <Icon icon={ICONS.filter} />
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Text text="Estados" size="sm" weight="semibold" />
                <div className="flex flex-wrap gap-2">
                  <Button>Normal</Button>
                  <Button disabled>Disabled</Button>
                </div>
              </div>
            </div>
          </section>

          {/* Title Variants */}
          <section className="space-y-4">
            <Title title="Title Component" level={2} size="2xl" />
            <div className="space-y-2">
              <Title title="Heading Level 1" level={1} />
              <Title title="Heading Level 2" level={2} />
              <Title title="Heading Level 3" level={3} />
              <Title title="Heading Level 4" level={4} />
              <Title title="Heading Level 5" level={5} />
              <Title title="Heading Level 6" level={6} />
            </div>
            <div className="space-y-2">
              <Title title="Tamaño personalizado: xs" size="xs" />
              <Title title="Tamaño personalizado: sm" size="sm" />
              <Title title="Tamaño personalizado: base" size="base" />
              <Title title="Tamaño personalizado: lg" size="lg" />
              <Title title="Tamaño personalizado: xl" size="xl" />
              <Title title="Tamaño personalizado: 2xl" size="2xl" />
              <Title title="Tamaño personalizado: 3xl" size="3xl" />
              <Title title="Tamaño personalizado: 4xl" size="4xl" />
            </div>
            <div className="space-y-2">
              <Title title="Alineación izquierda" align="left" />
              <Title title="Alineación centro" align="center" />
              <Title title="Alineación derecha" align="right" />
            </div>
          </section>

          {/* Text Variants */}
          <section className="space-y-4">
            <Title title="Text Component" level={2} size="2xl" />
            <div className="space-y-4">
              <div className="space-y-2">
                <Text text="Tamaños" size="sm" weight="semibold" />
                <Text text="Texto tamaño xs" size="xs" />
                <Text text="Texto tamaño sm" size="sm" />
                <Text text="Texto tamaño base" size="base" />
                <Text text="Texto tamaño lg" size="lg" />
                <Text text="Texto tamaño xl" size="xl" />
              </div>
              <div className="space-y-2">
                <Text text="Pesos de fuente" size="sm" weight="semibold" />
                <Text text="Texto peso light" weight="light" />
                <Text text="Texto peso normal" weight="normal" />
                <Text text="Texto peso medium" weight="medium" />
                <Text text="Texto peso semibold" weight="semibold" />
                <Text text="Texto peso bold" weight="bold" />
              </div>
              <div className="space-y-2">
                <Text text="Alineaciones" size="sm" weight="semibold" />
                <Text text="Texto alineado a la izquierda" align="left" />
                <Text text="Texto alineado al centro" align="center" />
                <Text text="Texto alineado a la derecha" align="right" />
                <Text
                  text="Texto justificado: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                  align="justify"
                />
              </div>
              <div className="space-y-2">
                <Text text="Truncate" size="sm" weight="semibold" />
                <Text
                  text="Este es un texto muy largo que se truncará con puntos suspensivos al final si es necesario"
                  truncate
                  className="max-w-xs"
                />
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}

export default App
