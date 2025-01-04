import React, { useEffect, useState, useRef } from 'react';
import mermaid from 'mermaid';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';

const InteractiveFlowchart = () => {
    const [scale, setScale] = useState(1);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const containerRef = useRef(null);

    useEffect(() => {
        mermaid.initialize({
            startOnLoad: true,
            theme: 'default',
            securityLevel: 'loose',
            themeVariables: {
                fontFamily: 'inter',
            }
        });
        mermaid.contentLoaded();
    }, []);

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setDragStart({
            x: e.clientX - position.x,
            y: e.clientY - position.y
        });
    };

    const handleMouseMove = (e) => {
        if (isDragging) {
            setPosition({
                x: e.clientX - dragStart.x,
                y: e.clientY - dragStart.y
            });
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleZoomIn = () => {
        setScale(prev => Math.min(prev + 0.1, 2));
    };

    const handleZoomOut = () => {
        setScale(prev => Math.max(prev - 0.1, 0.5));
    };

    const handleReset = () => {
        setScale(1);
        setPosition({ x: 0, y: 0 });
    };

    const diagram = `
    flowchart TB
      subgraph User["User Interaction Layer"]
          WC["Wallet Connection"]
          UI["Web Interface"]
      end

      subgraph Frontend["Frontend Layer"]
          Dashboard["Dashboard Component"]
          Analytics["Analytics Views"]
          Alerts["Alert System"]
      end

      subgraph Backend["Backend Services"]
          Auth["Authentication Service"]
          API["REST API"]
          WSS["WebSocket Service"]
          
          subgraph AI["AI Processing Layer"]
              ML["ML Models"]
              TA["Trend Analysis"]
              PP["Price Prediction"]
          end
          
          subgraph Data["Data Processing"]
              DP["Data Processor"]
              Cache["Redis Cache"]
          end
      end

      subgraph Storage["Data Storage"]
          DB[(PostgreSQL)]
          TS[(ClickHouse)]
      end

      subgraph External["External Services"]
          SRPC["Solana RPC"]
          MP["Market Data Provider"]
      end

      WC --> Auth
      UI --> Dashboard
      Dashboard --> Analytics
      Dashboard --> Alerts

      Auth --> API
      API --> DP
      DP --> Cache
      DP --> DB
      WSS --> Cache
      
      DP --> ML
      ML --> TA
      ML --> PP
      TA --> Analytics
      PP --> Alerts
      
      SRPC --> DP
      MP --> DP
      
      DP --> TS
      Cache --> API
      DB --> API
      TS --> Analytics

      style Frontend fill:#f9f,stroke:#333,stroke-width:2px
      style Backend fill:#bbf,stroke:#333,stroke-width:2px
      style Storage fill:#dfd,stroke:#333,stroke-width:2px
      style External fill:#ffd,stroke:#333,stroke-width:2px
      style AI fill:#fcf,stroke:#333,stroke-width:2px`;

    return (
        <Card className="w-full max-w-6xl mx-auto">
            <CardHeader>
                <div className="flex justify-between items-center">
                    <CardTitle>Solana Wallet Analyzer System Architecture</CardTitle>
                    <div className="flex gap-2">
                        <button
                            onClick={handleZoomIn}
                            className="p-2 rounded-lg hover:bg-gray-100"
                            title="Zoom In"
                        >
                            <ZoomIn className="h-5 w-5" />
                        </button>
                        <button
                            onClick={handleZoomOut}
                            className="p-2 rounded-lg hover:bg-gray-100"
                            title="Zoom Out"
                        >
                            <ZoomOut className="h-5 w-5" />
                        </button>
                        <button
                            onClick={handleReset}
                            className="p-2 rounded-lg hover:bg-gray-100"
                            title="Reset View"
                        >
                            <Maximize2 className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div
                    className="overflow-hidden border rounded-lg"
                    style={{ height: '600px' }}
                    ref={containerRef}
                >
                    <div
                        className="cursor-move relative"
                        style={{
                            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                            transformOrigin: 'center',
                            transition: isDragging ? 'none' : 'transform 0.1s ease-out'
                        }}
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseUp}
                    >
                        <div className="mermaid min-w-[800px] p-4">
                            {diagram}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default InteractiveFlowchart;