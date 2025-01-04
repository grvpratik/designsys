import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Progress } from '../components/ui/progress';
import { Badge } from '../components/ui/badge';
import { Alert, AlertDescription } from '../components/ui/alert';
import { Loader2, AlertTriangle, CheckCircle2, Clock, Gem } from 'lucide-react';
import axios from 'axios';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Button } from '../components/ui/button';
import TodoCalendar from '../components/calendar';
import FlowchartDiagram from '../components/flowchart';
import InteractiveFlowchart from '../components/flowchart';

interface ProductAnalysis {
    metadata: {
        id: string;
        timestamp: string;
        version: string;
    };

    overview: {
        marketAnalysis: {
            marketFit: string;
            potentialScore: number;
            timeToMarket: string;
        };
        complexity: {
            implementation: number;
            technical: number;
            resourceRequirements: string;
        };
        competition: {
            landscapeDescription: string;
            competitionLevel: 'low' | 'moderate' | 'high';
        };
        viabilityScore: number;
    };

    features: {
        core: Array<{
            id: string;
            name: string;
            description: string;
            priority: 'must-have' | 'should-have' | 'nice-to-have';
            complexity: number;
            status: 'planned' | 'in-development' | 'completed';
            estimatedDevelopmentTime: string;
        }>;
    };

    technology: {
        infrastructure: {
            recommended: Array<string>;
            alternatives: Array<string>;
            selfHosted: Array<string>;
        };
        stack: {
            frontend: Array<string>;
            backend: Array<string>;
            database: Array<string>;
            services: Array<string>;
        };
        requirements: {
            hosting: string;
            storage: string;
            computing: string;
            scaling: string;
        };
    };

    marketAnalysis: {
        competitors: Array<{
            id: string;
            name: string;
            description: string;
            website: string;
            metrics: {
                userBase: string;
                marketShare?: number;
                pricing?: {
                    min: number;
                    max: number;
                    currency: string;
                };
            };
            features: Array<string>;
            strengths: Array<string>;
            weaknesses: Array<string>;
        }>;
        opportunities: {
            gaps: Array<string>;
            innovations: Array<string>;
            trends: Array<string>;
        };
        risks: Array<{
            description: string;
            impact: 'low' | 'medium' | 'high';
            likelihood: 'low' | 'medium' | 'high';
            mitigation: string;
        }>;
    };

    businessModel: {
        revenue: {
            streams: Array<{
                type: string;
                description: string;
                potential: number;
            }>;
            pricing: {
                model: string;
                tiers: Array<{
                    name: string;
                    price: number;
                    features: Array<string>;
                }>;
            };
        };
        costs: {
            fixed: Array<{
                category: string;
                description: string;
                estimatedCost: number;
            }>;
            variable: Array<{
                category: string;
                description: string;
                unitCost: number;
            }>;
        };
        metrics: {
            targetCAC: number;
            targetLTV: number;
            targetMargin: number;
        };
    };
}

const PriorityBadge = ({ priority }) => {
    const colors = {
        'must-have': 'bg-red-100 text-red-800',
        'should-have': 'bg-yellow-100 text-yellow-800',
        'nice-to-have': 'bg-green-100 text-green-800'
    };

    return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[priority]}`}>
            {priority}
        </span>
    );
};

const StatusBadge = ({ status }) => {
    const statusConfig = {
        'planned': { color: 'bg-gray-100 text-gray-800', icon: Clock },
        'in-development': { color: 'bg-blue-100 text-blue-800', icon: Loader2 },
        'completed': { color: 'bg-green-100 text-green-800', icon: CheckCircle2 }
    };

    const { color, icon: Icon } = statusConfig[status];

    return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${color} flex items-center gap-1`}>
            <Icon className="w-3 h-3" />
            {status}
        </span>
    );
};

const ProductAnalysisDashboard = () => {
    const [data, setData] = useState(null as ProductAnalysis | null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [projectIdea, setProjectIdea] = useState('');
    const [detailedIdea, setDetailedIdea] = useState('basic');
    const [learningPurpose, setLearningPurpose] = useState('personal');

    const analyzeIdea = async (idea: string) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post('http://localhost:8787/gemini', {
                idea,
                detailLevel: detailedIdea,
                learningPurpose
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },

            });
            console.log(response, 'response')
            if (response.status !== 200) throw new Error('Failed to fetch data');

            const result = await response.data;
            setData(result);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleIdeaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const idea = e.target.value;
        setProjectIdea(idea);

    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="w-8 h-8 animate-spin" />
            </div>
        );
    }

    if (error) {
        return (
            <Alert variant="destructive" className="max-w-2xl mx-auto mt-4">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        );
    }

    return (
        <div className="w-full max-w-7xl mx-auto p-4 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>SDE Project Idea Analyzer</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Project Idea
                        </label>
                        <Textarea
                            placeholder="Describe your project idea..."
                            value={projectIdea}
                            onChange={handleIdeaChange}
                            className="min-h-32"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Detail Level
                            </label>
                            <Select value={detailedIdea} onValueChange={setDetailedIdea}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="basic">Basic Analysis</SelectItem>
                                    <SelectItem value="detailed">Detailed Analysis</SelectItem>
                                    <SelectItem value="comprehensive">Comprehensive Analysis</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Learning Purpose
                            </label>
                            <Select value={learningPurpose} onValueChange={setLearningPurpose}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="personal">Personal Project</SelectItem>
                                    <SelectItem value="portfolio">Portfolio Project</SelectItem>
                                    <SelectItem value="startup">Startup Idea</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <Button
                        onClick={() => analyzeIdea(projectIdea)}
                        disabled={!projectIdea || loading}
                        className="w-full"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Analyzing...
                            </>
                        ) : (
                            'Analyze Idea'
                        )}
                    </Button>

                </CardContent>
            </Card>

            {data && (
                <>
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl font-bold">{data.metadata.id}</h1>
                            <p className="text-gray-500">Last updated: {new Date(data.metadata.timestamp).toLocaleString()}</p>
                        </div>
                        <Badge variant="secondary">v{data.metadata.version}</Badge>
                    </div>

                    <Tabs defaultValue="overview" className="w-full">
                        <TabsList className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                            <TabsTrigger value="overview">Overview</TabsTrigger>
                            <TabsTrigger value="features">Features</TabsTrigger>
                            <TabsTrigger value="technology">Technology</TabsTrigger>
                            <TabsTrigger value="market">Market</TabsTrigger>
                            <TabsTrigger value="business">Business</TabsTrigger>
                        </TabsList>

                        <TabsContent value="overview" className="mt-6">
                            <div className="grid gap-6 md:grid-cols-2">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Market Analysis</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            <div>
                                                <h3 className="text-sm font-medium text-gray-500">Market Fit</h3>
                                                <p className="mt-1">{data.overview.marketAnalysis.marketFit}</p>
                                            </div>
                                            <div>
                                                <h3 className="text-sm font-medium text-gray-500">Potential Score</h3>
                                                <Progress value={data.overview.marketAnalysis.potentialScore * 10} className="mt-2" />
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle>Complexity Assessment</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            <div>
                                                <h3 className="text-sm font-medium text-gray-500">Implementation</h3>
                                                <Progress value={data.overview.complexity.implementation * 10} className="mt-2" />
                                            </div>
                                            <div>
                                                <h3 className="text-sm font-medium text-gray-500">Technical</h3>
                                                <Progress value={data.overview.complexity.technical * 10} className="mt-2" />
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </TabsContent>

                        <TabsContent value="features" className="mt-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Core Features</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid gap-4">
                                        {data.features.core.map((feature) => (
                                            <Card key={feature.id} className="p-4">
                                                <div className="flex items-start justify-between mb-2">
                                                    <div>
                                                        <h3 className="font-medium flex items-center gap-2">
                                                            {feature.name}
                                                            <PriorityBadge priority={feature.priority} />
                                                        </h3>
                                                        <p className="text-sm text-gray-600 mt-1">{feature.description}</p>
                                                    </div>
                                                    <StatusBadge status={feature.status} />
                                                </div>
                                                <div className="mt-4 flex items-center gap-4">
                                                    <div className="flex-1">
                                                        <span className="text-sm text-gray-500">Complexity</span>
                                                        <Progress value={feature.complexity * 10} className="mt-1" />
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <Clock className="w-4 h-4 text-gray-500" />
                                                        <span className="text-sm text-gray-600">{feature.estimatedDevelopmentTime}</span>
                                                    </div>
                                                </div>
                                            </Card>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="technology" className="mt-6">
                            <div className="grid gap-6 md:grid-cols-2">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Infrastructure</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            {Object.entries(data.technology.infrastructure).map(([key, values]) => (
                                                <div key={key}>
                                                    <h3 className="text-sm font-medium text-gray-500 capitalize">{key}</h3>
                                                    <div className="flex flex-wrap gap-2 mt-2">
                                                        {values.map((value, index) => (
                                                            <Badge key={index} variant="secondary">{value}</Badge>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle>Stack</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            {Object.entries(data.technology.stack).map(([key, values]) => (
                                                <div key={key}>
                                                    <h3 className="text-sm font-medium text-gray-500 capitalize">{key}</h3>
                                                    <div className="flex flex-wrap gap-2 mt-2">
                                                        {values.map((value, index) => (
                                                            <Badge key={index} variant="secondary">{value}</Badge>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </TabsContent>

                        <TabsContent value="market" className="mt-6">
                            <div className="space-y-6">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Competitors</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid gap-4 md:grid-cols-2">
                                            {data.marketAnalysis.competitors.map((competitor) => (
                                                <Card key={competitor.id} className="p-4">
                                                    <div className="flex justify-between items-start">
                                                        <h3 className="font-medium">{competitor.name}</h3>
                                                        <Badge variant="outline">{competitor.metrics.userBase}</Badge>
                                                    </div>
                                                    <p className="text-sm text-gray-600 mt-2">{competitor.description}</p>
                                                    <div className="mt-4">
                                                        <h4 className="text-sm font-medium mb-2">Key Features</h4>
                                                        <div className="flex flex-wrap gap-2">
                                                            {competitor.features.map((feature, index) => (
                                                                <Badge key={index} variant="secondary">{feature}</Badge>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </Card>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle>Market Opportunities</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid gap-4 md:grid-cols-2">
                                            {Object.entries(data.marketAnalysis.opportunities).map(([key, items]) => (
                                                <Card key={key} className="p-4">
                                                    <h3 className="font-medium mb-3 capitalize">{key}</h3>
                                                    <ul className="space-y-2">
                                                        {items.map((item, index) => (
                                                            <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                                                                <Gem className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                                                {item}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </Card>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </TabsContent>

                        <TabsContent value="business" className="mt-6">
                            <div className="grid gap-6 md:grid-cols-2">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Revenue Model</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-6">
                                            {data.businessModel.revenue.streams.map((stream, index) => (
                                                <div key={index} className="space-y-2">
                                                    <h3 className="font-medium">{stream.type}</h3>
                                                    <p className="text-sm text-gray-600">{stream.description}</p>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-sm text-gray-500">Potential:</span>
                                                        <Progress value={stream.potential * 10} className="flex-1" />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle>Key Metrics</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            {Object.entries(data.businessModel.metrics).map(([key, value]) => (
                                                <div key={key}>
                                                    <h3 className="text-sm font-medium text-gray-500 capitalize">
                                                        {key.replace(/([A-Z])/g, ' $1').trim()}
                                                    </h3>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <Progress value={value * 100} className="flex-1" />
                                                        <span className="text-sm font-medium">${value}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </TabsContent>
                    </Tabs>
                </>
            )}

            <TodoCalendar />
            <InteractiveFlowchart/>
        </div>
    );
};

export default ProductAnalysisDashboard;