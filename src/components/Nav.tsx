"use client"

import * as React from "react"
import Link from "next/link"
import { redirect, usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import { 
  HeartHandshake, 
  Moon, 
  Sun, 
  LogIn, 
  PlusCircle, 
  SlidersHorizontal, 
  CalendarCheck, 
  LogOut, 
  Menu 
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { authClient } from "@/lib/auth-client"

const navItems = [
  { name: "Home", href: "/" },
  { name: "Upcoming Events", href: "/events" },
  { name: "Create Events", href: "/events/create" },
  { name: "My Event", href: "/events/manage" },
  { name: "Features", href: "/features" },
  { name: "Our Team", href: "/team" },
  { name: "Gallery", href: "/gallery" },
]

export default  function Header() {
  const pathname = usePathname()
  const { setTheme, resolvedTheme } = useTheme()
  const [isOpen, setIsOpen] = React.useState(false)

  // Mock authentication state (Replace with your actual auth hook, e.g., NextAuth/BetterAuth)
  const { data: session } = authClient.useSession()
  // console.log("SessionData nav",session)
  const isLoggedIn = session?.user ? true : false;

  // console.log(session?.user)
  const user = session?.user
  const handleLogout = async() => {
     await authClient.signOut();
     redirect('/login')
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-glass-border-soft bg-glass shadow-glass-sm [-webkit-backdrop-filter:var(--blur)] [backdrop-filter:var(--blur)]">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6">
        
        {/* --- LOGO --- */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-[12px] text-[var(--btn-primary-fg)] shadow-[0_10px_24px_-12px_var(--primary-glow)] ring-1 ring-white/25 [background-image:var(--primary-grad)]">
            <HeartHandshake className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-base font-extrabold leading-tight tracking-tight text-foreground">
              Youth Foundation
            </span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
              Rohanpur
            </span>
          </div>
        </Link>

        {/* --- DESKTOP NAVIGATION --- */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "rounded-full px-3.5 py-1.5 text-sm font-medium transition-all hover:bg-[var(--tint-primary)] hover:text-primary",
                pathname === item.href ? "text-primary font-semibold" : "text-muted-foreground"
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* --- RIGHT ACTIONS --- */}
        <div className="flex items-center gap-2 sm:gap-4">
          
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            className="h-9 w-9 rounded-full text-muted-foreground hover:text-primary"
            aria-label="Toggle color theme"
            title="Toggle color theme"
          >
            <Moon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Sun className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>

          {/* --- AUTH STATE (LOGGED OUT) --- */}
          {!isLoggedIn && (
            <Button
              size="sm"
              nativeButton={false}
              render={<Link href="/login" />}
              className="hidden rounded-full px-4 text-[var(--btn-primary-fg)] shadow-[0_10px_24px_-12px_var(--primary-glow)] ring-1 ring-white/20 [background-image:var(--primary-grad)] hover:brightness-110 sm:flex"
            >
              <LogIn className="mr-2 h-4 w-4" /> Login
            </Button>
          )}

          {/* --- AUTH STATE (LOGGED IN) --- */}
          {isLoggedIn && (
            <div className="hidden sm:flex items-center gap-3">
              <TooltipProvider delay={100}>
                <Tooltip>
                  <DropdownMenu>
                    <TooltipTrigger
                      render={
                        <DropdownMenuTrigger className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-transparent outline-none ring-offset-background transition-colors hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" />
                      }
                    >
                      <Avatar className="h-full w-full">
                        <AvatarImage src={user?.image || ""} alt={user?.name} />
                        <AvatarFallback className="bg-[var(--tint-primary)] font-bold text-primary">
                          {user?.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                    </TooltipTrigger>
                    <TooltipContent side="bottom" className="text-xs font-semibold">
                      <p>{user?.name}</p>
                    </TooltipContent>
                    <DropdownMenuContent align="end" className="w-48 rounded-xl">
                      <DropdownMenuItem
                        render={<Link href="/create-event" />}
                        className="cursor-pointer"
                      >
                        <PlusCircle className="mr-2 h-4 w-4 text-muted-foreground" />
                        Create Event
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        render={<Link href="/manage-events" />}
                        className="cursor-pointer"
                      >
                        <SlidersHorizontal className="mr-2 h-4 w-4 text-muted-foreground" />
                        Manage Events
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        render={<Link href="/joined-events" />}
                        className="cursor-pointer"
                      >
                        <CalendarCheck className="mr-2 h-4 w-4 text-muted-foreground" />
                        Joined Events
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        variant="destructive"
                        onClick={handleLogout}
                        className="cursor-pointer"
                      >
                        <LogOut onClick={handleLogout} className="mr-2 h-4 w-4" />
                        Logout
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </Tooltip>
              </TooltipProvider>

              {/* Standalone Logout (Desktop) */}
              <Button 
                variant="outline" 
                size="icon" 
                onClick={handleLogout}
                className="h-9 w-9 rounded-full border-glass-border-soft text-muted-foreground hover:border-destructive/30 hover:bg-destructive/10 hover:text-destructive"
                title="Logout"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          )}

          {/* --- MOBILE MENU (SHEET) --- */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger
              render={<Button variant="ghost" size="icon" className="md:hidden" />}
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[300px] bg-glass-strong [-webkit-backdrop-filter:var(--blur-lg)] [backdrop-filter:var(--blur-lg)] sm:w-[400px]"
            >
              <SheetHeader className="text-left mb-6">
                <SheetTitle className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-[10px] text-[var(--btn-primary-fg)] ring-1 ring-white/20 [background-image:var(--primary-grad)]">
                    <HeartHandshake className="h-4 w-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-extrabold leading-tight">Youth Foundation</span>
                    <span className="text-[9px] font-bold uppercase tracking-widest text-primary">Rohanpur</span>
                  </div>
                </SheetTitle>
              </SheetHeader>
              
              <div className="flex flex-col gap-4">
                {/* Mobile Links */}
                <div className="flex flex-col space-y-3">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "rounded-full px-3 py-2 text-sm font-medium transition-colors hover:bg-[var(--tint-primary)] hover:text-primary",
                        pathname === item.href ? "text-primary font-semibold" : "text-foreground"
                      )}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>

                <div className="h-px w-full bg-border my-2" />

                {/* Mobile Auth Actions */}
                {!isLoggedIn ? (
                  <Button
                    nativeButton={false}
                    render={<Link href="/login" onClick={() => setIsOpen(false)} />}
                    className="w-full rounded-full text-[var(--btn-primary-fg)] shadow-[0_10px_24px_-12px_var(--primary-glow)] ring-1 ring-white/20 [background-image:var(--primary-grad)] hover:brightness-110"
                  >
                    <LogIn className="mr-2 h-4 w-4" /> Login
                  </Button>
                ) : (
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center gap-3 mb-2 px-2">
                      <Avatar className="h-10 w-10 border">
                        <AvatarImage src={user?.image || ""} alt={user?.name} />
                        <AvatarFallback className="bg-[var(--tint-primary)] font-bold text-primary">
                          {user?.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold">{user?.name}</span>
                        <span className="text-xs text-muted-foreground">Organizer</span>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      nativeButton={false}
                      render={<Link href="/create-event" onClick={() => setIsOpen(false)} />}
                      className="justify-start"
                    >
                      <PlusCircle className="mr-2 h-4 w-4" /> Create Event
                    </Button>
                    <Button
                      variant="ghost"
                      nativeButton={false}
                      render={<Link href="/manage-events" onClick={() => setIsOpen(false)} />}
                      className="justify-start"
                    >
                      <SlidersHorizontal className="mr-2 h-4 w-4" /> Manage Events
                    </Button>
                    <Button
                      variant="ghost"
                      nativeButton={false}
                      render={<Link href="/joined-events" onClick={() => setIsOpen(false)} />}
                      className="justify-start"
                    >
                      <CalendarCheck className="mr-2 h-4 w-4" /> Joined Events
                    </Button>
                    <Button 
                      variant="ghost" 
                      className="justify-start text-destructive hover:bg-destructive/10 hover:text-destructive" 
                      onClick={() => { handleLogout(); setIsOpen(false); }}
                    >
                      <LogOut className="mr-2 h-4 w-4" /> Logout
                    </Button>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>

        </div>
      </div>
    </header>
  )
}