import { Controller, Post, Get, Delete, Param, Body, Query } from '@nestjs/common';
import { BrowserProfileService, Platform } from '../services/browser-profile.service';

@Controller('api/browser-profiles')
export class BrowserProfileController {
    constructor(private readonly browserProfileService: BrowserProfileService) { }

    /**
     * Check if user has a browser profile for a platform
     */
    @Get('check')
    async checkProfile(
        @Query('userId') userId: string,
        @Query('platform') platform: Platform,
    ) {
        const hasProfile = await this.browserProfileService.hasProfile(userId, platform);
        const profile = hasProfile
            ? await this.browserProfileService.getProfile(userId, platform)
            : null;

        return {
            hasProfile,
            profile: profile
                ? {
                    id: profile.id,
                    platform: profile.platform,
                    createdAt: profile.createdAt,
                }
                : null,
        };
    }

    /**
     * Start the login workflow to create a browser profile
     * Returns stream URL for user to watch and manually log in
     */
    @Post('create')
    async createProfile(
        @Body() body: { userId: string; platform: Platform },
    ) {
        const result = await this.browserProfileService.createProfileForPlatform(
            body.userId,
            body.platform,
        );

        return {
            message: 'Login workflow started - please log in manually',
            workflowRunId: result.workflowRunId,
            streamUrl: result.streamUrl,
            instructions: [
                'A browser window will open to the login page',
                'Log in with your credentials',
                'Once logged in, the session will be saved automatically',
                'You can watch the process live at the stream URL',
            ],
        };
    }

    /**
     * Complete profile creation after login workflow finishes
     */
    @Post('complete')
    async completeProfile(
        @Body() body: { userId: string; platform: Platform; workflowRunId: string },
    ) {
        const profile = await this.browserProfileService.completeProfileCreation(
            body.userId,
            body.platform,
            body.workflowRunId,
        );

        return {
            success: true,
            profile: {
                id: profile.id,
                platform: profile.platform,
                skyvernProfileId: profile.skyvernProfileId,
                createdAt: profile.createdAt,
            },
        };
    }

    /**
     * Get all browser profiles for a user
     */
    @Get('user/:userId')
    async getProfiles(@Param('userId') userId: string) {
        const profiles = await this.browserProfileService.getProfilesForUser(userId);

        return {
            profiles: profiles.map((p) => ({
                id: p.id,
                platform: p.platform,
                isActive: p.isActive,
                createdAt: p.createdAt,
            })),
        };
    }

    /**
     * Delete a browser profile
     */
    @Delete(':userId/:platform')
    async deleteProfile(
        @Param('userId') userId: string,
        @Param('platform') platform: Platform,
    ) {
        await this.browserProfileService.deleteProfile(userId, platform);

        return {
            success: true,
            message: `Browser profile for ${platform} deleted`,
        };
    }
}
