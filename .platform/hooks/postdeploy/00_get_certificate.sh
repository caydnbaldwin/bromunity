#!/usr/bin/env bash
# .platform/hooks/postdeploy/00_get_certificate.sh
sudo certbot -n -d bromunity.app --nginx --agree-tos --email peteryoung.byu@gmail.com