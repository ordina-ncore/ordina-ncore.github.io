Jekyll::Hooks.register :site, :post_read do |site|
    puts 'Enriching posts with link to authors'
    
    site.posts.docs.each { |post|
        post.data['authors'].collect! { |author_username|
            site.data['authors']["pieter_nijs"]
        }.compact!
    }
end