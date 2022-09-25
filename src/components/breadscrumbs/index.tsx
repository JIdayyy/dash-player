import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";

export default function BreadScrumbs(): JSX.Element {
    const router = useRouter();

    const getBreadScrumbs = router.asPath
        .split("/")
        .filter((item) => item !== "");

    return (
        <Breadcrumb>
            <BreadcrumbItem>
                <BreadcrumbLink href={`/`}>{"HOME"}</BreadcrumbLink>
            </BreadcrumbItem>
            {getBreadScrumbs.map((item, index) => (
                <BreadcrumbItem
                    key={item + index}
                    isCurrentPage={index === getBreadScrumbs.length - 1}
                >
                    <BreadcrumbLink href={`/{${item}}`}>
                        {getBreadScrumbs.length ? item.toUpperCase() : "HOME"}
                    </BreadcrumbLink>
                </BreadcrumbItem>
            ))}
        </Breadcrumb>
    );
}
