/**
 * v0 by Vercel.
 * @see https://v0.dev/t/w1fYzXYyIZF
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DropdownMenuTrigger, DropdownMenuItem, DropdownMenuContent, DropdownMenu } from "@/components/ui/dropdown-menu"

export default function Component() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white dark:bg-gray-900 p-8 rounded-lg max-w-md w-full">
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="space-y-1.5">
              <Label className="text-lg font-semibold text-gray-700 dark:text-gray-300" htmlFor="name">
                Name
              </Label>
              <Input
                className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-gray-300 dark:bg-gray-800 dark:text-gray-200"
                id="name"
                placeholder="Lee Robinson"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-lg font-semibold text-gray-700 dark:text-gray-300" htmlFor="email">
                Email
              </Label>
              <Input
                className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-gray-300 dark:bg-gray-800 dark:text-gray-200"
                id="email"
                placeholder="m@example.com"
                type="email"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-lg font-semibold text-gray-700 dark:text-gray-300" htmlFor="password">
                Password
              </Label>
              <Input
                className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-gray-300 dark:bg-gray-800 dark:text-gray-200"
                id="password"
                placeholder="Enter your password"
                type="password"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-lg font-semibold text-gray-700 dark:text-gray-300" htmlFor="phone">
                Phone Number
              </Label>
              <Input
                className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-gray-300 dark:bg-gray-800 dark:text-gray-200"
                id="phone"
                placeholder="Enter your phone number"
                type="tel"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-lg font-semibold text-gray-700 dark:text-gray-300" htmlFor="role">
                Role
              </Label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild className="w-full inline-block cursor-pointer">
                  <div>
                    <Button
                      aria-expanded="true"
                      aria-haspopup="menu"
                      className="w-full justify-between p-3 border rounded-md focus:outline-none focus:ring focus:ring-gray-300 dark:bg-gray-800 dark:text-gray-200"
                      id="role"
                      variant="outline"
                    >
                      Choose a role
                      <div className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  aria-label="Menu"
                  className="mt-1 w-full bg-white dark:bg-gray-900 shadow-lg rounded-md"
                  static
                >
                  <DropdownMenuItem className="p-3 hover:bg-gray-100 dark:hover:bg-gray-800" value="Administrator">
                    Administrator
                  </DropdownMenuItem>
                  <DropdownMenuItem className="p-3 hover:bg-gray-100 dark:hover:bg-gray-800" value="Editor">
                    Editor
                  </DropdownMenuItem>
                  <DropdownMenuItem className="p-3 hover:bg-gray-100 dark:hover:bg-gray-800" value="Author">
                    Author
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <Button className="mt-4" onClick={undefined}>
            Create
          </Button>
        </div>
      </div>
    </div>
  )
}

