import { Component } from '@angular/core';
import { DataService } from '../../services/data.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat-bot',
  imports: [FormsModule],
  templateUrl: './chat-bot.component.html',
  styleUrl: './chat-bot.component.css',
})
export class ChatBotComponent {
  isChatOpen = false;
  chatInput = '';
  chatMessages: { sender: 'user' | 'bot'; text: string }[] = [];

  constructor(private dataService: DataService) {}

  toggleChat() {
    this.isChatOpen = !this.isChatOpen;
  }

  sendChat() {
    const message = this.chatInput.trim();
    if (!message) return;

    this.chatMessages.push({ sender: 'user', text: message });
    this.chatInput = '';

    this.dataService.sendHelpdeskMessage(message).subscribe({
      next: (res) => {
        this.chatMessages.push({ sender: 'bot', text: res.answer });
      },
      error: () => {
        this.chatMessages.push({
          sender: 'bot',
          text: 'Sorry, something went wrong. Please try again.',
        });
      },
    });
  }
}
