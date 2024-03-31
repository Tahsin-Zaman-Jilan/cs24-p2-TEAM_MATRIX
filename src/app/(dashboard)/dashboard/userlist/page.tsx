"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input"; // Corrected import path
import Link from "next/link";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export default function Component() {
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Add a loading state
  const [error, setError] = useState(null); // Add an error state

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true); // Set loading to true during fetch
        const response = await axios.get("http://localhost:3000/api/users");
        setUserData(response.data.data);
      } catch (error) {
        setError(error); // Set error if any
      } finally {
        setIsLoading(false); // Set loading to false after fetch
      }
    }

    fetchData();
  }, []);

  return (
    <div className="flex flex-col gap-2">
      <div className="overflow-hidden rounded-lg border shadow-lg">
        <div className="grid grid-cols-3 items-center bg-gray-100 p-4 dark:bg-gray-800">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
            Users
          </h1>
          <form className="flex items-center gap-4">
            <SearchIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            <Input className="flex-1" placeholder="Search..." type="search" />
          </form>
          <Link
            className="flex justify-end text-gray-500 underline dark:text-gray-400"
            href="#"
          >
            Export
          </Link>
        </div>
        <div className="border-t">
          {isLoading && <p className="text-center">Loading users...</p>}
          {error && <p className="text-center text-red-500">{error.message}</p>}
          {!isLoading && !error && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {userData.map((user) => (
                  <TableRow key={user.id} className="animate-fade-in">
                    <TableCell>
                      <img
                        src={user.image}
                        alt="User"
                        className="h-8 w-8 rounded-full"
                      />
                    </TableCell>
                    <TableCell className="font-semibold">
                      {user.name || "N/A"}
                    </TableCell>
                    <TableCell>{user.email || "N/A"}</TableCell>
                    <TableCell>{user.role || "N/A"}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline">View</Button>
                        <Button variant="outline">Edit</Button>
                        <Button variant="outline">Delete</Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
        <div className="flex justify-between bg-gray-100 p-4 dark:bg-gray-800">
          <div>
            <Button variant="outline">Bulk Actions</Button>
            <Button variant="outline">New User</Button>{" "}
            {/* Added closing </div> */}
          </div>
        </div>
      </div>
    </div>
  );
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
  );
}
