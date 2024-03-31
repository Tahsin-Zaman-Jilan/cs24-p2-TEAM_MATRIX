/**
 * v0 by Vercel.
 * @see https://v0.dev/t/27hzBmBzO24
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"

export default function Component() {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <header className="flex items-center h-16 px-4 border-b shrink-0 md:px-6">
        <nav className="flex-col hidden gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link className="flex items-center gap-2 text-lg font-semibold md:text-base" href="#">
            <Package2Icon className="w-6 h-6" />
            <span className="sr-only">DNCC Waste Management</span>
          </Link>
          <Link className="font-bold" href="#">
            Entry
          </Link>
          <Link className="text-gray-500 dark:text-gray-400" href="#">
            Exit
          </Link>
          <Link className="text-gray-500 dark:text-gray-400" href="#">
            Trucks
          </Link>
        </nav>
        <div className="flex items-center w-full gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <form className="flex-1 ml-auto sm:flex-initial">
            <div className="relative">
              <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
              <Input
                className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
                placeholder="Search trucks..."
                type="search"
              />
            </div>
          </form>
          <Button className="rounded-full" size="icon" variant="ghost">
            <img
              alt="Avatar"
              className="rounded-full"
              height="32"
              src="/placeholder.svg"
              style={{
                aspectRatio: "32/32",
                objectFit: "cover",
              }}
              width="32"
            />
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </div>
      </header>
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
        <div className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Entry</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="grid gap-2">
                  <Label className="text-sm" htmlFor="truck-number">
                    Truck Number
                  </Label>
                  <Input id="truck-number" placeholder="Enter truck number" />
                </div>
                <div className="grid gap-2">
                  <Label className="text-sm" htmlFor="driver-name">
                    Driver Name
                  </Label>
                  <Input id="driver-name" placeholder="Enter driver name" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label className="text-sm" htmlFor="cargo-volume">
                  Cargo Volume
                </Label>
                <Input id="cargo-volume" placeholder="Enter cargo volume" />
              </div>
              <div className="grid gap-2">
                <Label className="text-sm" htmlFor="entry-time">
                  Entry Time
                </Label>
                <Input id="entry-time" type="datetime-local" />
              </div>
              <Button className="ml-auto" size="sm">
                Submit
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Exit</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="grid gap-2">
                  <Label className="text-sm" htmlFor="truck-number">
                    Truck Number
                  </Label>
                  <Input id="truck-number" placeholder="Enter truck number" />
                </div>
                <div className="grid gap-2">
                  <Label className="text-sm" htmlFor="driver-name">
                    Driver Name
                  </Label>
                  <Input id="driver-name" placeholder="Enter driver name" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label className="text-sm" htmlFor="cargo-volume">
                  Cargo Volume
                </Label>
                <Input id="cargo-volume" placeholder="Enter cargo volume" />
              </div>
              <div className="grid gap-2">
                <Label className="text-sm" htmlFor="exit-time">
                  Exit Time
                </Label>
                <Input id="exit-time" type="datetime-local" />
              </div>
              <Button className="ml-auto" size="sm">
                Submit
              </Button>
            </CardContent>
          </Card>
        </div>
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">ID</TableHead>
                <TableHead>Truck Number</TableHead>
                <TableHead>Driver Name</TableHead>
                <TableHead>Cargo Volume</TableHead>
                <TableHead>Entry Time</TableHead>
                <TableHead>Exit Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-semibold">1</TableCell>
                <TableCell>TRK001</TableCell>
                <TableCell>John Doe</TableCell>
                <TableCell>1000</TableCell>
                <TableCell>2023-01-01 10:00</TableCell>
                <TableCell>2023-01-01 15:00</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold">2</TableCell>
                <TableCell>TRK002</TableCell>
                <TableCell>Jane Smith</TableCell>
                <TableCell>1500</TableCell>
                <TableCell>2023-01-01 11:00</TableCell>
                <TableCell>2023-01-01 16:00</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold">3</TableCell>
                <TableCell>TRK003</TableCell>
                <TableCell>Bob Johnson</TableCell>
                <TableCell>2000</TableCell>
                <TableCell>2023-01-01 12:00</TableCell>
                <TableCell>2023-01-01 17:00</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold">4</TableCell>
                <TableCell>TRK004</TableCell>
                <TableCell>Alice Lee</TableCell>
                <TableCell>2500</TableCell>
                <TableCell>2023-01-01 13:00</TableCell>
                <TableCell>2023-01-01 18:00</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold">5</TableCell>
                <TableCell>TRK005</TableCell>
                <TableCell>Mike Brown</TableCell>
                <TableCell>3000</TableCell>
                <TableCell>2023-01-01 14:00</TableCell>
                <TableCell>2023-01-01 19:00</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Card>
      </main>
    </div>
  )
}

function Package2Icon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
      <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
      <path d="M12 3v6" />
    </svg>
  )
}


function SearchIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}
