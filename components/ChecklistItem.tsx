/**
 * Copyright (c) 2025 jmenichole
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { ChecklistItem } from '../types';
import { Icon } from './Icon';

interface ChecklistItemProps {
  item: ChecklistItem;
  isChecked: boolean;
  onToggle: () => void;
}

const ChecklistItemComponent: React.FC<ChecklistItemProps> = ({ item, isChecked, onToggle }) => {
  return (
    <label
      htmlFor={item.id}
      className={`flex items-start p-4 rounded-md cursor-pointer transition-all duration-200 ${
        isChecked ? 'bg-green-500/10 border-green-400/30' : 'bg-gray-700/50 hover:bg-gray-700'
      } border border-transparent`}
    >
      <div className="flex items-center h-6">
        <input
          id={item.id}
          type="checkbox"
          checked={isChecked}
          onChange={onToggle}
          className="hidden"
        />
        <div
          className={`w-5 h-5 rounded-md flex-shrink-0 flex items-center justify-center border transition-colors ${
            isChecked ? 'bg-green-500 border-green-400' : 'bg-gray-600 border-gray-500'
          }`}
        >
          {isChecked && <Icon name="check" className="w-4 h-4 text-white" />}
        </div>
      </div>
      <div className="ml-4 text-sm">
        <span
          className={`font-medium ${
            isChecked ? 'text-gray-300 line-through' : 'text-gray-200'
          }`}
        >
          {item.text}
        </span>
        {item.details && (
          <p className={`mt-1 text-xs ${
            isChecked ? 'text-gray-500' : 'text-gray-400'
          }`}>{item.details}</p>
        )}
      </div>
    </label>
  );
};

export default ChecklistItemComponent;
