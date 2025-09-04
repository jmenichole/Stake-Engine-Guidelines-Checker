
import React, { useState, useCallback, ChangeEvent } from 'react';
import { Icon } from '../components/Icon';

const ImageUpload: React.FC<{ onUpload: (file: string) => void; title: string; description: string }> = ({ onUpload, title, description }) => {
  const handleFileChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpload(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, [onUpload]);

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-300 mb-1">{title}</label>
      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-600 border-dashed rounded-md">
        <div className="space-y-1 text-center">
          <Icon name="upload" className="mx-auto h-12 w-12 text-gray-500" />
          <div className="flex text-sm text-gray-500">
            <label htmlFor={`file-upload-${title}`} className="relative cursor-pointer bg-gray-800 rounded-md font-medium text-cyan-400 hover:text-cyan-300 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-900 focus-within:ring-cyan-500">
              <span>Upload a file</span>
              <input id={`file-upload-${title}`} name={`file-upload-${title}`} type="file" className="sr-only" onChange={handleFileChange} accept="image/png, image/jpeg" />
            </label>
            <p className="pl-1">or drag and drop</p>
          </div>
          <p className="text-xs text-gray-500">{description}</p>
        </div>
      </div>
    </div>
  );
};

const AssetPreviewer: React.FC = () => {
  const [background, setBackground] = useState<string | null>(null);
  const [foreground, setForeground] = useState<string | null>(null);
  const [logo, setLogo] = useState<string | null>(null);
  const [gameTitle, setGameTitle] = useState('GAME TITLE');
  const [publisherName, setPublisherName] = useState('PUBLISHER NAME');

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight text-white mb-2">
          Game Tile Asset Previewer
        </h1>
        <p className="text-lg text-gray-400">
          Upload your assets to see a preview of your game tile.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Controls */}
        <div className="space-y-6">
          <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Tile Text</h3>
             <div>
                <label htmlFor="game-title" className="block text-sm font-medium text-gray-300">Game Title</label>
                <input
                    type="text"
                    id="game-title"
                    value={gameTitle}
                    onChange={(e) => setGameTitle(e.target.value.toUpperCase())}
                    className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
                />
            </div>
            <div className="mt-4">
                <label htmlFor="publisher-name" className="block text-sm font-medium text-gray-300">Publisher Name</label>
                <input
                    type="text"
                    id="publisher-name"
                    value={publisherName}
                    onChange={(e) => setPublisherName(e.target.value.toUpperCase())}
                    className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
                />
            </div>
          </div>
          <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Image Assets</h3>
            <div className="space-y-4">
              <ImageUpload onUpload={setBackground} title="Background Image" description="PNG, JPG up to 10MB" />
              <ImageUpload onUpload={setForeground} title="Foreground Image" description="PNG with transparency" />
              <ImageUpload onUpload={setLogo} title="Publisher Logo" description="PNG with transparency" />
            </div>
          </div>
        </div>

        {/* Preview */}
        <div className="flex flex-col items-center">
          <h3 className="text-xl font-semibold mb-4 text-white">Live Preview</h3>
          <div className="w-80 h-80 bg-gray-700 rounded-xl overflow-hidden shadow-2xl relative flex items-center justify-center text-gray-500">
            {background ? (
              <img src={background} alt="Background" className="w-full h-full object-cover" />
            ) : (
                <div className="text-center">
                    <Icon name="image" className="w-16 h-16 text-gray-600 mx-auto" />
                    <p>Background</p>
                </div>
            )}
            {foreground && (
              <img src={foreground} alt="Foreground" className="absolute w-full h-full object-contain" />
            )}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-center">
                <h4 className="text-white text-3xl font-extrabold tracking-wider" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.8)'}}>{gameTitle}</h4>
                <div className="flex items-center justify-center mt-2">
                    {logo && <img src={logo} alt="Publisher Logo" className="h-5 w-auto mr-2 object-contain"/>}
                    <p className="text-gray-300 text-xs font-bold tracking-widest">{publisherName}</p>
                </div>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-4">Preview is an approximation of the final tile.</p>
        </div>
      </div>
    </div>
  );
};

export default AssetPreviewer;
