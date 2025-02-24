import React, { useState } from 'react';
import { Sparkles, Type, Smile, MessageSquare, Send } from 'lucide-react';

type ContentType = 'photo' | 'video' | 'carousel' | 'reel';

interface CaptionSection {
  hook: string;
  story: string;
  emojis: string;
  cta: string;
}

function App() {
  const [contentType, setContentType] = useState<ContentType>('photo');
  const [description, setDescription] = useState('');
  const [caption, setCaption] = useState<CaptionSection | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateCaption = async () => {
    setIsGenerating(true);
    // Simulating API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Example generated content - in a real app, this would come from an API
    setCaption({
      hook: "🚀 Ready to transform your Instagram game?",
      story: "Just discovered a game-changing way to create content that truly resonates. As a creator, I've always struggled with finding the right words... until now!\n\nSwipe through to see how this new approach is changing everything.",
      emojis: "✨ 💡 🎯",
      cta: "Double tap if you're ready to level up your content game! Share your biggest caption writing challenge below 👇"
    });
    setIsGenerating(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-2">
              <Sparkles className="text-purple-600" />
              Caption Creator GPT
            </h1>
            <p className="text-gray-600">Transform your ideas into engaging Instagram captions</p>
          </div>

          {/* Input Section */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">Content Type</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {(['photo', 'video', 'carousel', 'reel'] as ContentType[]).map((type) => (
                  <button
                    key={type}
                    onClick={() => setContentType(type)}
                    className={`px-4 py-2 rounded-lg capitalize ${
                      contentType === type
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">
                Describe your content
              </label>
              <textarea
                className="w-full h-32 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                placeholder="What's your post about? Include key details and the message you want to convey..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <button
              onClick={generateCaption}
              disabled={!description || isGenerating}
              className={`w-full py-3 rounded-lg flex items-center justify-center gap-2 ${
                !description || isGenerating
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-purple-600 hover:bg-purple-700'
              } text-white font-medium transition-colors`}
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                  Generating...
                </>
              ) : (
                <>
                  <Send size={20} />
                  Generate Caption
                </>
              )}
            </button>
          </div>

          {/* Output Section */}
          {caption && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Generated Caption</h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Type className="text-purple-600 mt-1" />
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Hook</h3>
                    <p className="text-gray-700">{caption.hook}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <MessageSquare className="text-purple-600 mt-1" />
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Story</h3>
                    <p className="text-gray-700 whitespace-pre-line">{caption.story}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Smile className="text-purple-600 mt-1" />
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Suggested Emojis</h3>
                    <p className="text-gray-700">{caption.emojis}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Send className="text-purple-600 mt-1" />
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Call-to-Action</h3>
                    <p className="text-gray-700">{caption.cta}</p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    const fullCaption = `${caption.hook}\n\n${caption.story}\n\n${caption.emojis}\n\n${caption.cta}`;
                    navigator.clipboard.writeText(fullCaption);
                  }}
                  className="w-full mt-4 py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg flex items-center justify-center gap-2 transition-colors"
                >
                  Copy Full Caption
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;