"use client";

import { useState } from "react";
import { FaEllipsisV } from "react-icons/fa";
import Link from "next/link";

interface Props {
  groupId: string,
  newsId: string
}

const CardGroupNews: React.FC<Props> = ({ groupId, newsId }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <div>
      <h2 className="font-bold text-2xl mb-2">News 1.2</h2>
      <div className="flex justify-between items-start">
        {/* Wrap the news content with a Link to navigate to the detail page */}
        <Link href={`/group/${groupId}/news/${newsId}`}>
          <p className="mr-20 text-justify cursor-pointer hover:text-blue-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae
            ad voluptas earum quidem quibusdam laboriosam, illo similique, quae
            asperiores ipsam, veniam id! Voluptatibus delectus accusamus
            corrupti labore pariatur architecto quasi.
          </p>
        </Link>

        {/* Three-Dot Dropdown */}
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <FaEllipsisV className="text-lg" />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white shadow-md rounded-md border">
              <ul className="space-y-2">
                <li>
                  <button className="block w-full text-left p-2 text-sm hover:bg-gray-200">
                    Edit
                  </button>
                </li>
                <li>
                  <button className="block w-full text-left p-2 text-sm hover:bg-gray-200">
                    Delete
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
      <div className="divider" />
    </div>
  );
}

export default CardGroupNews
