"use client"

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Eye, Download, Trash2 } from 'lucide-react';

const SOWList = () => {
  // Mock data for saved SOWs
  const savedSOWs = [
    {
      id: 1,
      clientName: "Acme Corporation",
      projectName: "Cloud Migration",
      status: "Draft",
      createdDate: "01/06/2025",
      estimatedCost: "$45,000"
    },
    {
      id: 2,
      clientName: "TechStart Inc",
      projectName: "DevOps Setup",
      status: "Completed",
      createdDate: "20/05/2025",
      estimatedCost: "$32,000"
    },
    {
      id: 3,
      clientName: "Global Systems",
      projectName: "Infrastructure Audit",
      status: "In Review",
      createdDate: "10/05/2025",
      estimatedCost: "$18,500"
    }
  ];

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "Completed":
        return "default";
      case "In Review":
        return "secondary";
      case "Draft":
        return "outline";
      default:
        return "outline";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Saved SOWs</CardTitle>
            <p className="text-sm text-muted-foreground">Manage and view all your statement of work documents</p>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client Name</TableHead>
                  <TableHead>Project Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created Date</TableHead>
                  <TableHead>Estimated Cost</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {savedSOWs.map((sow) => (
                  <TableRow key={sow.id}>
                    <TableCell className="font-medium">{sow.clientName}</TableCell>
                    <TableCell>{sow.projectName}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusBadgeVariant(sow.status)}>
                        {sow.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{sow.createdDate}</TableCell>
                    <TableCell>{sow.estimatedCost}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SOWList;