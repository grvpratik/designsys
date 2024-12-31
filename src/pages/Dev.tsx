import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2 } from 'lucide-react';
import axios from 'axios';
import MarkdownRenderer from '../components/markdown';

const AnalysisDisplay = () => {
    const [analysisData, setAnalysisData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchAnalysisData();
    }, []);

    const fetchAnalysisData = async () => {
        try {
            const response = await axios.get('http://localhost:40525/ai', {

                headers: {
                    'Content-Type': 'application/json',
                },

            });



            console.log(await response)
            if (response.status!==200) {
                throw new Error('Failed to fetch analysis data');
            }
            const data = response.data;
            setAnalysisData(data);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
            console.error('Fetch error:', err);
        }
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
            <div className="text-red-500 p-4 text-center">
                Error loading analysis: {error}
            </div>
        );
    }

    // Convert markdown to HTML - You'll need to actually implement this
    // using a library like marked or react-markdown in your project
    // const renderMarkdown = (markdown) => {
    //     return <div dangerouslySetInnerHTML={{ __html: markdown }} />;
    // };
    console.log(analysisData?.overview?.response)
    // const parseBulletPoints = (text) => {
    //     if (!text) return [];

    //     const lines = text.split('\n').filter(line => line.trim());
    //     const sections = [];
    //     let currentSection = null;

    //     lines.forEach(line => {
    //         // Check if line is a main section (bold text with colon)
    //         if (line.includes(':**')) {
    //             if (currentSection) {
    //                 sections.push(currentSection);
    //             }
    //             currentSection = {
    //                 title: line.split(':**')[0].replace('**', '').trim(),
    //                 items: []
    //             };
    //         }
    //         // Check if line is a bullet point
    //         else if (line.includes('* **')) {
    //             const [label, value] = line.split(':**');
    //             currentSection.items.push({
    //                 label: label.replace('* **', '').trim(),
    //                 value: value ? value.trim() : ''
    //             });
    //         }
    //     });

    //     if (currentSection) {
    //         sections.push(currentSection);
    //     }

    //     return sections;
    // };

    const sections = [
        { id: 'overview', title: 'Overview', content: analysisData?.overview?.response },
        { id: 'features', title: 'Features', content: analysisData?.features?.response },
        { id: 'audience', title: 'Audience', content: analysisData?.audience?.response },
        { id: 'prosCons', title: 'Pros & Cons', content: analysisData?.prosCons?.response },
        { id: 'competition', title: 'Competition', content: analysisData?.competition?.response },
        { id: 'problems', title: 'Problems', content: analysisData?.problems?.response },
        { id: 'technology', title: 'Technology', content: analysisData?.technology?.response },
        { id: 'challenges', title: 'Challenges', content: analysisData?.challenges?.response },
        { id: 'similarIdeas', title: 'Similar Ideas', content: analysisData?.similarIdeas?.response },
        { id: 'monetization', title: 'Monetization', content: analysisData?.monetization?.response }
    ];

    return (
        <Card className="w-full max-w-4xl mx-auto">
            <CardHeader>
                <CardTitle>Product Analysis</CardTitle>
                <div className="text-sm text-gray-500">
                    Generated on: {new Date(analysisData?.timestamp).toLocaleString()}
                </div>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="overview" className="w-full">
                    <TabsList className="grid grid-cols-2 lg:grid-cols-5 gap-4 my-4">
                        {sections.map(section => (
                            <TabsTrigger
                                
                                key={section.id}
                                value={section.id}
                                disabled={!section.content}
                                className="w-full "
                            >
                                {section.title}
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    {sections.map(section => (
                        <TabsContent
                            key={section.id}
                            value={section.id}
                            className="mt-6"
                        >
                            {section.content ? (
                                <div className="prose mt-4 pt-4 max-w-none">
                                    <MarkdownRenderer  markdownString={section.content} />
                                </div>
                            ) : (
                                <p className="text-gray-500 italic">
                                    No {section.title.toLowerCase()} analysis available
                                </p>
                            )}
                        </TabsContent>
                    ))}
                </Tabs>
            </CardContent>
        </Card>
    );
};

export default AnalysisDisplay;