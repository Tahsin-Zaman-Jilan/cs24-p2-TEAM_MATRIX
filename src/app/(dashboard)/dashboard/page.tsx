import AnalyticsCard from "@/components/AnalyticsCard";
import { Overview } from "@/components/BarChart";
import { Sidebar } from "@/components/common/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { navigationOptions } from "@/config/navigation";
import React from "react";
import { CardDetails } from "../cardDetails";

const DashboardPage = () => {
  return (
    <div className="hidden md:block">
      <div className="border-t">
        <div className="bg-background">
          <div className="grid min-h-[100vh] lg:grid-cols-5">
            <Sidebar
              navigationOptions={navigationOptions}
              className="hidden lg:block"
            />
            <div className="col-span-3 lg:col-span-4 lg:border-l">
              <div className="flex h-full flex-col gap-4 px-4 py-6 lg:px-8">
                <AnalyticsCard cards={CardDetails} />
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                  <Card className="col-span-4">
                    <CardHeader>
                      <CardTitle>Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                      <Overview />
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
