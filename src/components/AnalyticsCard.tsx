import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export type AnalyticCardPropType = {
  title: string;
  icon: React.JSX.Element;
  detail: string;
  subDetail: string;
};

interface AnalyticCardProps extends React.HTMLAttributes<HTMLDivElement> {
  cards: AnalyticCardPropType[];
}

const AnalyticsCard = ({ cards }: AnalyticCardProps) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <Card key={card.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
            {card.icon}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{card.detail}</div>
            <p className="text-xs text-muted-foreground">{card.subDetail}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AnalyticsCard;
